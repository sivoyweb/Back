import {
  ArrayMinSize,
  IsArray,
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  MaxLength,
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

  @IsNumber()
  @IsPositive()
  @IsOptional()
  price: number;

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
}
