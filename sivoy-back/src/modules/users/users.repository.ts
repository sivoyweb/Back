import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/helpers/roles.enum.';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Credential } from 'src/entities/credential.entity';
import * as bcrypt from 'bcrypt';
import { Disability } from 'src/entities/disabilities.entity';
import { Image } from 'src/entities/images.entity';

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
    console.log(credentialsFound);
    if (!credentialsFound) {
      return false;
    }
    const user = await this.usersRepository.findOne({
      where: { credential: credentialsFound },
    });
    return user.id;
  }

  async updateUser(id: string, user: UpdateUserDto) {
    const userFound = await this.usersRepository.findOne({
      where: { id },
      relations: ['disabilities', 'credential'],
    });

    if (!userFound) {
      throw new HttpException({ status: 404, error: 'User not found' }, 404);
    }

    const { credential } = userFound;

    if (user.credential.avatar) {
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

    if (user.disabilities) {
      userFound.disabilities = await Promise.all(
        user.disabilities.map(async (disability) => {
          const existingDisability = await this.disabilitiesRepository.findOne({
            where: { name: disability.name },
          });

          if (existingDisability) {
            return existingDisability;
          } else {
            return this.disabilitiesRepository.create(disability);
          }
        }),
      );
    }

    await this.credentialsRepository.update(credential.id, credential);
    userFound.credential = credential;
    await this.usersRepository.save(userFound);

    return 'User Updated';
  }

  async createUser(userDto: CreateUserDto) {
    const { name, email, password, phone } = userDto;

    const hashedPassword = await bcrypt.hash(password, 11);

    const credential = this.credentialsRepository.create({
      email,
      password: hashedPassword,
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
}
