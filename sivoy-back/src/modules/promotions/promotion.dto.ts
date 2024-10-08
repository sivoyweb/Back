import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsDate,
  IsDateString,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Image } from 'src/entities/images.entity';

export class CreatePromotionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  @IsArray()
  images: Image[];

  @IsNotEmpty()
  @IsDateString()
  validFrom: Date;

  @IsNotEmpty()
  @IsDateString()
  validUntil: Date;
}

export class UpdatePromotionDto {

  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsArray()
  images?: Image[];

  @IsOptional()
  @IsDateString()
  validFrom?: Date;

  @IsOptional()
  @IsDateString()
  validUntil?: Date;
}
