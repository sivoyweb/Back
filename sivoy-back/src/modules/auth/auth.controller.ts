import {
  Body,
  Controller,
  Get,
  HttpException,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import {
  CreateUserDto,
  LoginUserDto,
  EmailDto,
  ResetPasswordDto,
  SendEmailDto,
  UpdateUserDto,
} from '../users/user.dto';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { ApiTags } from '@nestjs/swagger';
import sendEmailService from 'src/helpers/email.service';
import { CONTACT_EMAIL } from 'src/config/envConfig';
import {
  getStructureForContact,
  getStructureForHelp,
} from 'src/utils/mail.structure';
import { Role } from 'src/helpers/roles.enum.';

@ApiTags(`Auths`)
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UsersService,
  ) {}

  @Post('signup')
  async signUp(@Body() user: CreateUserDto) {
    const userId = await this.userService.isEmailInUse(user.email);

    if (userId) {
      const { userWithoutPassword } = await this.userService.getUserById(
        userId as string,
      );
      if (userWithoutPassword.role !== Role.Disabled) {
        throw new HttpException(
          { status: 400, error: 'email already in use' },
          400,
        );
      }

      await this.userService.updateUser(
        userId as string,
        {
          credential: { email: null },
        } as UpdateUserDto,
      );
    }

    const { message } = await this.authService.signup(user);
    return message;
  }

  @Post('signin')
  async signIn(@Body() userData: LoginUserDto) {
    const response = await this.authService.signin(userData);
    return response;
  }

  @Post('signin/google')
  async googleSignin(@Body() userData: EmailDto) {
    const user = await this.authService.signinGoogle(userData.email);

    return user;
  }

  @Put('/reset-password')
  async resetPassword(@Body() userData: ResetPasswordDto) {
    const { password, resetCode, email } = userData;

    const userId = await this.userService.isEmailInUse(email);

    if (!userId) {
      throw new HttpException({ status: 404, error: 'user not found' }, 404);
    }

    await this.authService.resetPasswordService(
      userId as string,
      password,
      resetCode,
    );

    return { message: 'Password updated successfully' };
  }

  @Post('/forgot-password')
  async forgotPassword(@Body() userData: EmailDto) {
    return await this.authService.sendResetPasswordCode(userData.email);
  }

  @Get('verify-email')
  async verifyEmail(@Query('token') token: string) {
    return await this.authService.verifyToken(token);
  }

  @Post('/send-help-email')
  async sendHelpEmail(@Body() data: SendEmailDto) {
    await sendEmailService(
      CONTACT_EMAIL,
      'Otras colaboraciones',
      getStructureForHelp(data.email, data.helpType, data.name, data.message),
    );
    return { message: 'email sent' };
  }

  @Post('/send-contact-email')
  async sendEmail(@Body() data: SendEmailDto) {
    await sendEmailService(
      CONTACT_EMAIL,
      data.subject,
      getStructureForContact(data.name, data.email, data.message),
    );
    return { message: 'email sent' };
  }
}
