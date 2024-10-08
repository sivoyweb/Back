import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { Image } from 'src/entities/images.entity';

export class CreateSuggestionDto {
  @IsNotEmpty()
  @IsUUID()
  userId: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  country: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  city: string;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  @IsString()
  @IsOptional()
  serviceType: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  images: Partial<Image[]>;

  @IsNotEmpty()
  @IsString()
  @IsUrl()
  website: string;

  @IsNotEmpty()
  @IsString()
  phone: string;

  @IsNotEmpty()
  @IsEmail()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  address: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  openingHours: string;
}
export class UpdateSuggestionDto {

  @IsString()
  @MinLength(3)
  @MaxLength(255)
  @IsOptional()
  name?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  country?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  city?: string;

  @IsDateString()
  @IsOptional()
  date?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  description?: string;

  @IsString()
  @IsOptional()
  serviceType?: string;

  @IsArray()
  @ArrayMinSize(1)
  @IsOptional()
  images?: Partial<Image[]>;

  @IsString()
  @IsUrl()
  @IsOptional()
  website?: string;

  @IsString()
  @IsOptional()
  phone?: string;

  @IsEmail()
  @MaxLength(255)
  @IsOptional()
  email?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  address?: string;

  @IsString()
  @MaxLength(255)
  @IsOptional()
  openingHours?: string;
}
