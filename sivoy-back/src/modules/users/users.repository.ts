import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/helpers/roles.enum.';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './user.dto';
import { Credential } from 'src/entities/credential.entity';
import * as bcrypt from 'bcrypt';
import { startWith } from 'rxjs';

@Injectable()
export class UsersRepository {
  constructor(
    @InjectRepository(User) private readonly usersRepository: Repository<User>,
    @InjectRepository(Credential)
    private readonly credentialsRepository: Repository<Credential>,
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
      relations: ['credential'],
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
    const userFound = await this.usersRepository.findOne({ where: { id } });
    if (!userFound) {
      throw new HttpException({ status: 404, error: 'User not found' }, 404);
    }

    await this.usersRepository.update(id, user);

    return 'User Updated';
  }

  async createUser(userDto: CreateUserDto) {
    const { name, email, password, phone, disabilities } = userDto;

    const hashedPassword = await bcrypt.hash(password, 11);

    const credential = this.credentialsRepository.create({
      email,
      password: hashedPassword,
    });

    await this.credentialsRepository.update(credential.id, credential);

    const user: Partial<User> = {
      name,
      phone,
      disabilities,
      role: Role.User,
      createdAt: new Date(),
      credential,
    };
    this.usersRepository.create(user);

    await this.usersRepository.save(user);

    return user;
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
}
