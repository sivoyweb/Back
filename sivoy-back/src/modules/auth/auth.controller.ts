import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Query,
} from '@nestjs/common';
import {
  CreateUserDto,
  LoginUserDto,
  SendEmailDto,
  SignInGoogleDto,
} from '../users/user.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags(`Auths`)
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

    const token = await this.authService.signup(user);
    return { token };
  }

  @Post('signin')
  async signIn(@Body() userData: LoginUserDto) {
    const response = await this.authService.signin(userData);
    return response;
  }

  @Post('signin/google')
  async googleSignin(@Body() userData: SignInGoogleDto) {
    const user = await this.authService.signinGoogle(userData.email);

    return user;
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return await this.authService.verifyToken(token);
  }

  @Post('send-email')
  async sendEmail(@Body() data: SendEmailDto) {
    return await this.authService.sendEmail(data.token, data.html);
  }
}
