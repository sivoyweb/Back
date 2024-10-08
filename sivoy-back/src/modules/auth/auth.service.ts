import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto, LoginUserDto } from '../users/user.dto';
import { UsersRepository } from '../users/users.repository';
import {
  getStructureForForgotPassword,
  getStructureForVerification,
  getStructureforWelcome,
} from 'src/utils/mail.structure';
import sendEmailService from 'src/helpers/email.service';
import { JWT_SECRET, URL_LOGIN_FRONT } from 'src/config/envConfig';
import { User } from 'src/entities/user.entity';
import { v4 as uuidv4 } from 'uuid';
import { Repository } from 'typeorm';
import { Credential } from 'src/entities/credential.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class AuthService {
  constructor(
    private readonly userRepository: UsersRepository,
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    @InjectRepository(Credential)
    private readonly credentialRepository: Repository<Credential>,
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
      return { message: 'User created successfully' };
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

    if (userData.block) {
      throw new HttpException(
        {
          status: 401,
          error: 'your account has been blocked by an admin',
        },
        401,
      );
    }

    const passwordToConfirm = user.password;

    const verifyPassword = await bcrypt.compare(
      data.password,
      passwordToConfirm,
    );

    if (!verifyPassword) {
      throw new HttpException({ status: 401, error: 'Unauthorized' }, 401);
    }

    const { ...userFinal } = user.userWithoutPassword;

    const payload = {
      sub: userData.id,
      id: userData.id,
      email: userData.credential.email,
      role: userFinal.role,
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
      role: role,
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

    return `Cuenta verificada, inicie sesión aquí: ${URL_LOGIN_FRONT}`;
  }

  async sendResetPasswordCode(email: string) {
    const userId = await this.userRepository.isEmailUsed(email);
    if (!userId) {
      throw new Error('User not found');
    }

    const user = await this.userRepository.getUserById(userId as string);

    const resetCodeLarge: string = uuidv4();
    const resetCode = resetCodeLarge
      .substring(0, resetCodeLarge.indexOf('-'))
      .toUpperCase();
    const expiration = new Date();
    expiration.setHours(expiration.getHours() + 1);

    const { credential } = user;
    credential.resetPasswordCode = resetCode;
    credential.resetPasswordExpiration = expiration;

    await this.credentialRepository.save(credential);

    await sendEmailService(
      email,
      'reset password',
      getStructureForForgotPassword(resetCode),
    );

    return { message: 'Reset code sent' };
  }

  async resetPasswordService(userId: string, password: string, code: string) {
    const user = await this.userRepository.getUserById(userId);

    const { credential } = user;

    if (code !== credential.resetPasswordCode) {
      throw new HttpException({ status: 401, error: 'Incorrect code' }, 401);
    }

    if (credential.resetPasswordExpiration < new Date()) {
      throw new HttpException({ status: 401, error: 'Code expired' }, 401);
    }

    const hashedPassword = await bcrypt.hash(password, 11);

    credential.password = hashedPassword;
    credential.resetPasswordCode = null;
    credential.resetPasswordExpiration = null;

    await this.credentialRepository.save(credential);
  }
}
