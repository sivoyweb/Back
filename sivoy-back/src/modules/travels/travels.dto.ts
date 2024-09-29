import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsDateString,
  IsEmail,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
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

  @IsString()
  @IsOptional()
  serviceType: string;

  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  accesibilitySeal: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  reviews: Partial<Review[]>;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  images: Partial<Image[]>;

  @IsNotEmpty()
  @IsNumber()
  stars: number;

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
  @IsString()
  serviceType?: string;

  @IsOptional()
  @IsString()
  @MaxLength(255)
  accesibilitySeal?: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  reviews?: Partial<Review[]>;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  images?: Partial<Image[]>;

  @IsOptional()
  @IsNumber()
  stars?: number;

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
