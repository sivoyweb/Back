import { HttpException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly UsersRepository: UsersRepository) {}

  async getAllUsers() {
    try {
      const users = await this.UsersRepository.getAllUsers();
      const usersWithoutPassword = [];
      users.forEach((user) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        const { password, ...credentialWithoutPassword } = user.credential;
        const userWithoutPassword = {
          ...user,
          credential: {
            ...credentialWithoutPassword,
          },
        };
        usersWithoutPassword.push(userWithoutPassword);
      });

      return usersWithoutPassword;
    } catch (err) {
      throw new HttpException(
        { status: 500, error: 'internal server error getting users' },
        500,
      );
    }
  }

  async getUserById(id: string) {
    try {
      const user = await this.UsersRepository.getUserById(id);
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...credentialWithoutPassword } = user.credential;
      const userWithoutPassword = {
        ...user,
        credential: {
          ...credentialWithoutPassword,
        },
      };

      return { userWithoutPassword, password };
    } catch (err) {
      return err;
    }
  }

  async updateUser(id: string, user: UpdateUserDto) {
    try {
      return await this.UsersRepository.updateUser(id, user);
    } catch (err) {
      return err;
    }
  }

  async isEmailInUse(email: string) {
    return this.UsersRepository.isEmailUsed(email);
  }

  async deleteUser(id: string) {
    try {
      return await this.UsersRepository.deleteUser(id);
    } catch (err) {
      return err;
    }
  }

  async blockUser(id: string) {
    try {
      return await this.UsersRepository.blockUser(id);
    } catch (err) {
      return err;
    }
  }

  async unblockUser(id: string) {
    try {
      return await this.UsersRepository.unblockUser(id);
    } catch (err) {
      return err;
    }
  }
}
