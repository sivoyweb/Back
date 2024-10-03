import { HttpException, Injectable } from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { UpdateUserDto } from './user.dto';
import { DisabilitiesRepository } from '../disabilities/disabilities.repository';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly disabilitiesRepository: DisabilitiesRepository,
  ) {}

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
    if (user.disabilities) {
      const actualDisabilities =
        await this.disabilitiesRepository.getDisabilities();

      const processedDisabilities = await Promise.all(
        user.disabilities?.map(async (disability) => {
          const exist = actualDisabilities.some(
            (actualDisability) => disability.name === actualDisability.name,
          );

          if (!exist) {
            try {
              const result =
                await this.disabilitiesRepository.addDisability(disability);
              return result;
            } catch (err) {
              throw new HttpException(
                `Internal server error creating disability on update user: ${err.message}`,
                500,
              );
            }
          } else {
            return disability;
          }
        }) || [],
      );

      user.disabilities = processedDisabilities;
    }

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
