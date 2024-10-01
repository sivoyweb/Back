import { PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword';
import { Disability } from 'src/entities/disabilities.entity';
import { Image } from 'src/entities/images.entity';
import { Role } from 'src/helpers/roles.enum.';

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
  role: Role;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  avatar: Image;

  @IsOptional()
  @IsString()
  @IsStrongPassword()
  @MinLength(8)
  @MaxLength(15)
  password: string;

  @IsOptional()
  @Validate(MatchPassword, [`password`])
  confirmPassword: string;
}

export class SignInGoogleDto extends PickType(CreateUserDto, ['email']) {}

export class SendEmailDto extends PickType(CreateUserDto, ['email']) {
  @IsString()
  @IsOptional()
  htmlMessage: string;

  @IsString()
  @IsOptional()
  subject: string;
}
