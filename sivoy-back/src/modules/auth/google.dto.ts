import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignInGoogle {
  @IsNotEmpty()
  @IsEmail()
  email: string;
}
