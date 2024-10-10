import {
  ArrayMinSize,
  IsArray,
  IsDateString,
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  IsUUID,
  Max,
  MaxLength,
  Min,
  MinLength,
} from 'class-validator';
import { Image } from 'src/entities/images.entity';
import { Review } from 'src/entities/review.entity';
import { AccessibilitySealName } from 'src/helpers/accessibilitySealName.enum';
import { ServiceType } from 'src/helpers/serviceType.enum';

export class CreateTravelDto {
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

  @IsNotEmpty()
  @IsEnum(ServiceType)
  serviceType: ServiceType;

  @IsEnum(AccessibilitySealName)
  @IsNotEmpty() 
  accessibilitySealName?: AccessibilitySealName;

  @IsOptional()
  @IsArray()
  accessibilitySeal: Image[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  images: Image[];

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

export class UpdateTravelDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  country?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  city?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  description?: string;

  @IsOptional()
  @IsEnum(ServiceType)
  serviceType?: ServiceType;

  @IsEnum(AccessibilitySealName)
  @IsOptional()
  accessibilitySealName?: AccessibilitySealName;

  @IsOptional()
  @IsArray()
  accessibilitySeal?:Image[];

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  images?: Image[];

  @IsOptional()
  @IsString()
  @IsUrl()
  website?: string;

  @IsOptional()
  @IsString()
  phone?: string;

  @IsOptional()
  @IsEmail()
  @MaxLength(255)
  email?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  address?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  openingHours?: string;
}

export class CreateReviewDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  review: string;

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(5)
  stars: number;

  @IsNotEmpty()
  @IsUUID()
  travelId: string;
}

export class UpdateReviewDto {
  @IsOptional()
  @IsString()
  @MaxLength(255)
  review?: string;

  @IsOptional()
  @IsInt()
  @Min(1)
  @Max(5)
  stars?: number;
}
