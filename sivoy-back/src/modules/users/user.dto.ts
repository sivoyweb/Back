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
  /**
   * Debe ser un string entre 3 y 50 caracteres
   * @example Pedro
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsEnum(Role)
  @IsOptional()
  role?: Role;

  /**
   * Debe ser un numero telefonico
   * @example 123456789
   */
  @IsNumber()
  @IsNotEmpty()
  phone: number;

  /**
   * Debe ser un string que especifique tipo de discapacidad
   * @example atrofia muscular espinal
   */
  @IsString()
  @IsOptional()
  disabilities?: string;

  /**
   * Deebe ser un string y un email valido
   * @example usuario@mail.com
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * Debe ser un string entre 8 y 15 caracteres, con al menos una letra minúscula, una letra mayúscula,
   * al menos un número y al menos uno de los siguientes carácteres especiales: !@#$%^&*()_-+={}[]|:;"'<>,.?/\
   * @example "aaBB123#"
   */
  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @MinLength(8)
  @MaxLength(15)
  password: string;

  /**
   * Deber ser igual a la password
   */
  @Validate(MatchPassword, [`password`])
  confirmPassword: string;
}

export class LoginUserDto extends PickType(CreateUserDto, [
  `email`,
  `password`,
]) {}

export class UpdateUserDto {
  /**
   * Debe ser un string entre 3 y 50 caracteres
   * @example Pedro
   */
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsOptional()
  @IsString()
  @IsIn([`admin`, `user`])
  role: string;

  /**
   * Debe ser un string que especifique tipo de discapacidad
   * @example atrofia muscular espinal
   */
  @IsString()
  @IsOptional()
  disabilities?: string;

  /**
   * Deebe ser un string y un email valido
   * @example usuario@mail.com
   */
  @IsOptional()
  @IsEmail()
  email: string;

  /**
   * Debe ser un string entre 8 y 15 caracteres, con al menos una letra minúscula, una letra mayúscula,
   * al menos un número y al menos uno de los siguientes carácteres especiales: !@#$%^&*()_-+={}[]|:;"'<>,.?/\
   * @example "aaBB123#"
   */
  @IsOptional()
  @IsString()
  @IsStrongPassword()
  @MinLength(8)
  @MaxLength(15)
  password: string;

  /**
   * Deber ser igual a la password
   */
  @IsOptional()
  @Validate(MatchPassword, [`password`])
  confirmPassword: string;
}

