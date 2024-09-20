import { HttpException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/entities/user.entity';
import { Role } from 'src/helpers/roles.enum.';
import { Repository } from 'typeorm';
import { CreateUserDto } from './user.dto';
import { Credential } from 'src/entities/credential.entity';

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

  async isEmailUsed(email: string) {
    const credentialsFound = await this.credentialsRepository.findOne({
      where: { email },
    });
    if (!credentialsFound) {
      return false;
    }
    return true;
  }

  async updateUser(id: string, user: User) {
    const userFound = await this.usersRepository.findOne({ where: { id } });
    if (!userFound) {
      throw new HttpException({ status: 404, error: 'User not found' }, 404);
    }

    await this.usersRepository.update(id, user);

    return 'User Updated';
  }

  async createUser(userDto: CreateUserDto) {
    const { name, email, password } = userDto;

    // Crea las credenciales
    const credential = this.credentialsRepository.create({
      email,
      password,
    });

    await this.credentialsRepository.update(credential.id, credential);

    // Crea el usuario
    const user = this.usersRepository.create({
      name,
      role: Role.User, // Asignar 'user' como rol por defecto
      createdAt: new Date(),
      credential,
    });

    await this.usersRepository.save(user);

    return 'User created successfully';
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
