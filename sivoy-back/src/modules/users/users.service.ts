import { HttpException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './user.dto';
import { DisabilitiesRepository } from '../disabilities/disabilities.repository';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async getAllUsers() {
    try {
      const users = await this.usersRepository.getAllUsers();
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
    const user = await this.usersRepository.getUserById(id);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...credentialWithoutPassword } = user.credential;
    const userWithoutPassword = {
      ...user,
      credential: {
        ...credentialWithoutPassword,
      },
    };

    return { userWithoutPassword, password };
  }

  async updateUser(id: string, user: UpdateUserDto) {
    return await this.usersRepository.updateUser(id, { ...user });
  }

  async isEmailInUse(email: string) {
    return await this.usersRepository.isEmailUsed(email);
  }

  async deleteUser(id: string) {
    return await this.usersRepository.deleteUser(id);
  }

  async makeAdmin(email: string) {
    const userId: boolean | string =
      await this.usersRepository.isEmailUsed(email);

    if (!userId) {
      throw new HttpException({ status: 404, error: 'user not found' }, 404);
    }

    return await this.usersRepository.makeAdmin(userId as string);
  }

  async blockUser(id: string) {
    return await this.usersRepository.blockUser(id);
  }

  async unblockUser(id: string) {
    return await this.usersRepository.unblockUser(id);
  }
}
