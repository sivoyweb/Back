import { HttpException, Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from '../users/user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async signin(data: LoginUserDto) {
    try {
      const { email, password } = data;
      const exist: boolean | string =
        await this.userService.isEmailInUse(email);
      if (!exist) {
        throw new HttpException({ status: 404, error: 'User not found' }, 404);
      }

      const user = await this.userService.getUserById(exist as string);
      const passwordToConfirm = user.password;

      const verify = await bcrypt.compare(password, passwordToConfirm);

      if (!verify) {
        throw new HttpException({ status: 401, error: 'Unauthorized' }, 401);
      }

      const payload = {
        sub: user.id,
        id: user.id,
        email: user.userWithoutPassword.credential.email,
        role: user.role,
      };

      const token = this.jwtService.sign(payload);

      return { message: 'User logged in successfully', token };
    } catch (err) {
      console.log(err);
      if (err.status === 401) {
        throw new HttpException({ status: 401, error: 'Unauthorized' }, 401);
      }
      throw new HttpException(
        { status: 500, error: 'internal server error login user' },
        500,
      );
    }
  }
}
