import {
  ArrayMinSize,
  IsArray,
  IsDate,
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
  @MaxLength(20)
  destination: string;

  @IsOptional()
  @IsString()
  @IsDate()
  date: string;

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
  servicetype: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  reviews: Partial<Review[]>;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  images: Partial<Image[]>;

  @IsOptional()
  @IsNumber()
  stars: number;
}
