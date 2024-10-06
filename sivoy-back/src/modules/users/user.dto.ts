import { PickType } from '@nestjs/swagger';
import {
  IsArray,
  IsBoolean,
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

  @IsString()
  @IsOptional()
  phone: string;

  @IsOptional()
  @IsBoolean()
  isRepresentative: boolean;

  @IsOptional()
  @IsArray()
  @IsString({ each: true }) // Cada valor del array debe ser una cadena de texto
  disabilities?: string[]; // Nombres de las discapacidades

  @IsOptional()
  credential: Credential;
}

export class EmailDto extends PickType(CreateUserDto, ['email']) {}

export class SendEmailDto extends PickType(CreateUserDto, ['email']) {
  @IsString()
  @IsNotEmpty()
  helpType: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  message: string;
}

export class ResetPasswordDto extends PickType(CreateUserDto, [
  'email',
  'password',
  'confirmPassword',
]) {
  @IsNotEmpty()
  @IsString()
  resetCode: string;
}
