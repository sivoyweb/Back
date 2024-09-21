import { Body, Controller, Post } from '@nestjs/common';
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
    const newUser = await this.userService.createUSer(user);
    return newUser;
  }

  @Post('signin')
  async signIn(@Body() userData: LoginUserDto) {
    const response = this.authService.signin(userData);
    return response;
  }
}
