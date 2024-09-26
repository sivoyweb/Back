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
import { FirebaseAdminService } from 'src/utils/firebase.service';
import { SignInGoogle } from './google.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
    private readonly firebaseService: FirebaseAdminService,
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

  @Post('signup/google')
  async googleSignup(@Body() userData: SignInGoogle) {
    const firebaseUser = await this.firebaseService.verifyToken(userData.token);

    await this.authService.signupGoogle(userData, firebaseUser);

    return 'User created successfully';
  }

  @Post('signin/google')
  async googleSignin() {}

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return await this.authService.verifyToken(token);
  }

  @Post('email')
  async sendEmail(@Query() data) {
    return await this.authService.sendEmail(data.token, data.html);
  }
}
