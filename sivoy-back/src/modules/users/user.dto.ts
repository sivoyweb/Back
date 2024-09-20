import { PickType } from '@nestjs/swagger';
import {
  IsEmail,
  IsEmpty,
  IsEnum,
  IsIn,
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
import { Role } from 'src/helpers/roles.enum.';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  @IsNumber()
  @IsNotEmpty()
  phone: number;

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
