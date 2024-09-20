import { PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsStrongPassword,
  MaxLength,
  MinLength,
  Validate,
} from 'class-validator';
import { MatchPassword } from 'src/decorators/matchPassword';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsEmpty()
  @IsString()
  @IsIn([`admin`, `user`])
  role?: string;

  @IsString()
  @IsOptional()
  disabilities?: string;

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
  @IsString()
  @IsIn([`admin`, `user`])
  role: string;

  @IsString()
  @IsOptional()
  disabilities?: string;

  @IsOptional()
  @IsEmail()
  email: string;

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
