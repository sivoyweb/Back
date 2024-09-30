import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from '../users/user.dto';
import { UsersRepository } from '../users/users.repository';
import {
  getStructureForVerification,
  getStructureforWelcome,
} from 'src/utils/mail.structure';
import sendEmailService from 'src/helpers/email.service';
import { JWT_SECRET } from 'src/config/envConfig';
import { User } from 'src/entities/user.entity';
import { Credential } from 'src/entities/credential.entity';

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

      const token = await this.jwtService.signAsync(payload, {
        secret: JWT_SECRET,
      });

      await sendEmailService(
        newUser.credential.email,
        'Welcome',
        getStructureforWelcome(token),
      );

      return token;
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
    const userData = user.userWithoutPassword;

    if (!user || !user.password) {
      throw new HttpException({ status: 404, error: 'User not found' }, 404);
    }

    const passwordToConfirm = user.password;

    const verifyPassword = await bcrypt.compare(
      data.password,
      passwordToConfirm,
    );

    if (!verifyPassword) {
      throw new HttpException({ status: 401, error: 'Unauthorized' }, 401);
    }

    const { role, ...userFinal } = user.userWithoutPassword;

    const payload = {
      sub: userData.id,
      id: userData.id,
      email: userData.credential.email,
      role: user.role,
    };

    const token = this.jwtService.sign(payload);

    if (!userData.auth) {
      await sendEmailService(
        userData.credential.email,
        'Email verification',
        getStructureForVerification(token),
      );
      throw new HttpException(
        { status: 401, error: 'Email must be verified' },
        401,
      );
    }

    return { userFinal, token };
  }

  async signinGoogle(email: string) {
    const exist: boolean | string = await this.userService.isEmailInUse(email);
    if (!exist) {
      throw new HttpException({ status: 404, error: 'User not found' }, 404);
    }

    const user = await this.userService.getUserById(exist as string);

    const { role, ...userFinal } = user.userWithoutPassword;

    const payload = {
      sub: userFinal.id,
      id: userFinal.id,
      email: userFinal.credential.email,
      role: userFinal.role,
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

  async sendEmail(to: string, subject: string, textMessage: string) {
    await sendEmailService(to, subject, textMessage);
  }
}
