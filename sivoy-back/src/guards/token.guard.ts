import {
  CanActivate,
  ExecutionContext,
  HttpException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { JWT_SECRET } from 'src/config/envConfig';
import { User } from 'src/entities/user.entity';
import { UsersService } from 'src/modules/users/users.service';

@Injectable()
export class TokenGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req = context.switchToHttp().getRequest();

    try {
      const token = req.headers['authorization']?.split(' ')[1] ?? '';

      if (!token) {
        return false;
      }

      const payload = await this.jwtService.verifyAsync(token, {
        secret: JWT_SECRET,
      });

      console.log(payload);

      if (!payload) {
        return false;
      }
      const userFound = await this.userService.getUserById(payload.id);

      if (!userFound.userWithoutPassword) {
        return false;
      }

      payload.iat = new Date(payload.iat * 1000);
      payload.exp = new Date(payload.exp * 1000);
      payload.role = userFound.userWithoutPassword.role;

      req.user = payload;

      return true;
    } catch (err) {
      console.log(err);
      throw new HttpException(
        {
          status: 400,
          error: 'token invalid or expired',
        },
        400,
      );
    }
  }
}
