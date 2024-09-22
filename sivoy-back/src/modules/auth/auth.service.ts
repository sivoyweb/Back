import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from '../users/user.dto';
import { UsersRepository } from '../users/users.repository';
import { getStructureforWelcome } from 'src/utils/mail.structure';
import sendEmailService from 'src/helpers/email.service';
import { JWT_SECRET } from 'src/config/envConfig';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signup(user: CreateUserDto) {
    try {
      const newUser = await this.userRepository.createUser(user);

      const payload = {
        sub: newUser.id,
        id: newUser.id,
        email: newUser.credential.email,
        role: newUser.role,
      };

      const token = await this.jwtService.signAsync(payload);

      await sendEmailService(
        user.email,
        'welcome',
        getStructureforWelcome(token),
      );

      return 'User created successfully';
    } catch (err) {
      console.log(err);
      throw new HttpException(
        { status: 500, error: 'internal server error creating users' },
        500,
      );
    }
  }

  async signin(data: LoginUserDto) {
    const exist: boolean | string = await this.userService.isEmailInUse(
      data.email,
    );
    if (!exist) {
      throw new HttpException({ status: 404, error: 'User not found' }, 404);
    }

    const user = await this.userService.getUserById(exist as string);
    const passwordToConfirm = user.password;

    const verify = await bcrypt.compare(data.password, passwordToConfirm);

    if (!verify) {
      throw new HttpException({ status: 401, error: 'Unauthorized' }, 401);
    }

    const { role, ...userFinal } = user.userWithoutPassword;

    const payload = {
      sub: user.id,
      id: user.id,
      email: user.userWithoutPassword.credential.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    return { userFinal, token };
  }

  async verifyToken(token: string) {
    const verify = await this.jwtService.verifyAsync(token, {
      secret: JWT_SECRET,
    });

    if (!verify) {
      throw new HttpException({ status: 401, error: 'invalid token' }, 401);
    }

    await this.userRepository.verifyUser(verify.id);

    return 'authenticated user';
  }
}
