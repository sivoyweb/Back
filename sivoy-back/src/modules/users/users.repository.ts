import {
  ForbiddenException,
  HttpException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/helpers/roles.enum.';
import { Not, Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Credential } from 'src/entities/credential.entity';
import * as bcrypt from 'bcrypt';
import { Disability } from 'src/entities/disabilities.entity';
import { Image } from 'src/entities/images.entity';
import { AVATAR_DEFAULT, PUBLIC_ID_AVATAR } from 'src/config/envConfig';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Credential)
    private readonly credentialsRepository: Repository<Credential>,
    @InjectRepository(Disability)
    private readonly disabilitiesRepository: Repository<Disability>,
    @InjectRepository(Image)
    private readonly imagesRepository: Repository<Image>,
  ) {}

  async getAllUsers() {
    const users = await this.usersRepository.find({
      relations: ['credential'],
    });

    return users;
  }

  async getUserById(id: string) {
    const userFound = await this.usersRepository.findOne({
      where: { id },
      relations: ['credential', 'disabilities', 'credential.avatar'],
    });
    if (!userFound) {
      throw new HttpException({ status: 404, error: 'User not found' }, 404);
    }

    return userFound;
  }

  async isEmailUsed(email: string): Promise<boolean | string> {
    const credentialsFound = await this.credentialsRepository.findOne({
      where: { email },
    });

    if (!credentialsFound) {
      return false;
    }
    const user = await this.usersRepository.findOne({
      where: { credential: credentialsFound },
    });
    return user.id;
  }

  async updateUser(id: string, user: UpdateUserDto) {
    // Buscar el usuario por ID con relaciones
    const userFound = await this.usersRepository.findOne({
      where: { id },
      relations: ['disabilities', 'credential'],
    });

    if (!userFound) {
      throw new HttpException({ status: 404, error: 'User not found' }, 404);
    }

    const { credential } = userFound;

    if (user.credential?.avatar) {
      const existingAvatar = await this.imagesRepository.findOne({
        where: { publicId: user.credential.avatar.publicId },
      });

      if (existingAvatar) {
        credential.avatar = existingAvatar;
      } else {
        const newAvatar = this.imagesRepository.create(user.credential.avatar);
        credential.avatar = await this.imagesRepository.save(newAvatar);
      }
    }

    Object.assign(userFound, user);

    if (user.disabilities && user.disabilities.length > 0) {
      const updatedDisabilities = await Promise.all(
        user.disabilities.map(async (disability: Partial<Disability>) => {
          if (disability.id) {
            const existingDisability =
              await this.disabilitiesRepository.findOne({
                where: { id: disability.id },
              });

            if (existingDisability) {
              existingDisability.name =
                disability.name || existingDisability.name;
              existingDisability.active =
                typeof disability.active === 'boolean'
                  ? disability.active
                  : existingDisability.active;

              return await this.disabilitiesRepository.save(existingDisability);
            }
          }

          let existingDisability = await this.disabilitiesRepository.findOne({
            where: { name: disability.name },
          });

          if (!existingDisability) {
            existingDisability = this.disabilitiesRepository.create({
              name: disability.name,
              active:
                typeof disability.active === 'boolean'
                  ? disability.active
                  : true,
            });
            await this.disabilitiesRepository.save(existingDisability);
          }

          return existingDisability;
        }),
      );

      userFound.disabilities = updatedDisabilities;
    }

    await this.credentialsRepository.update(credential.id, credential);
    userFound.credential = credential;

    const newUser = await this.usersRepository.save(userFound);

    return { message: 'User Updated', user: newUser };
  }

  async createUser(userDto: CreateUserDto) {
    const { name, email, password, phone } = userDto;

    const hashedPassword = await bcrypt.hash(password, 11);
    let avatar = await this.imagesRepository.findOne({
      where: { url: AVATAR_DEFAULT },
    });

    if (!avatar) {
      avatar = await this.imagesRepository.save({
        url: AVATAR_DEFAULT,
        publicId: PUBLIC_ID_AVATAR,
      });
    }

    const credential = this.credentialsRepository.create({
      email,
      password: hashedPassword,
      avatar,
    });

    await this.credentialsRepository.update(credential.id, credential);

    const user: Partial<User> = {
      name,
      phone,
      role: Role.User,
      createdAt: new Date(),
      credential,
    };
    this.usersRepository.create(user);

    await this.usersRepository.save(user);

    return user;
  }

  async createCredential(credential: Partial<Credential>) {
    const newCredential = credential;
    this.credentialsRepository.create(newCredential);
    await this.credentialsRepository.save(newCredential);
    return newCredential;
  }

  async deleteUser(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException({ status: 404, error: 'User not found' }, 404);
    }
    await this.usersRepository.update(id, { role: Role.Disabled });
    return 'User Deleted';
  }

  async makeAdmin(id: string) {
    await this.usersRepository.update(id, { role: Role.Admin });
    return 'User updated';
  }

  async blockUser(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException({ status: 404, error: 'User not found' }, 404);
    }
    await this.usersRepository.update(id, { block: true });
    return 'User Blocked';
  }

  async unblockUser(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });
    if (!user) {
      throw new HttpException({ status: 404, error: 'User not found' }, 404);
    }
    await this.usersRepository.update(id, { block: false });
    return 'User Unblocked';
  }

  async verifyUser(id: string) {
    const user = await this.usersRepository.findOne({ where: { id } });

    if (!user) {
      throw new HttpException({ status: 404, error: 'user not found' }, 404);
    }

    await this.usersRepository.update(id, { auth: true });
  }

  async getReviewsByUser(id: string, userId: string, userRole: string) {
    if (userId !== id && userRole !== Role.Admin) {
      throw new ForbiddenException(
        'You do not have permission to view these reviews',
      );
    }
    const userReviews = await this.usersRepository.findOne({
      where: { id },
      relations: {
        reviews: true,
      },
    });

    if (!userReviews) throw new NotFoundException(`User with ${id} not found`);
    return userReviews;
  }

  async getSuggestionsByUser(id: string, userId: string, userRole: Role) {
    if (userId !== id && userRole !== Role.Admin) {
      throw new ForbiddenException(
        'You do not have permission to view these suggestions',
      );
    }
    const userSuggestions = await this.usersRepository.findOne({
      where: { id },
      relations: {
        suggestions: true,
      },
    });

    if (!userSuggestions) throw new NotFoundException(`User with ${id} not found`);
    return userSuggestions;
  }
}
