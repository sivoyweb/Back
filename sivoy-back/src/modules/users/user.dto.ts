import { PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword';
import { Credential } from 'src/entities/credential.entity';
import { Disability } from 'src/entities/disabilities.entity';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @MinLength(8)
  @MaxLength(15)
  password: string;

  @Validate(MatchPassword, [`password`])
  confirmPassword: string;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  `email`,
  `password`,
]) {}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsOptional()
  phone: string;

  @IsOptional()
  disabilities?: Disability[];

  @IsOptional()
  credential: Credential;
}

export class EmailDto extends PickType(CreateUserDto, ['email']) {}

export class ResetPasswordDto extends PickType(CreateUserDto, [
  'email',
  'password',
  'confirmPassword',
]) {
  @IsNotEmpty()
  @IsString()
  resetCode: string;
}
