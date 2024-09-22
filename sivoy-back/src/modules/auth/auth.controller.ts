import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
} from '@nestjs/common';
import { CreateUserDto, LoginUserDto } from '../users/user.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    const valid = await this.userService.isEmailInUse(user.email);

    if (valid !== false) {
      throw new HttpException(
        { status: 400, error: 'email already in use' },
        400,
      );
    }

    const newUser = await this.authService.signup(user);
    return newUser;
  }

  @Post('signin')
  async signIn(@Body() userData: LoginUserDto) {
    const response = await this.authService.signin(userData);
    return response;
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return await this.authService.verifyToken(token);
  }
}
