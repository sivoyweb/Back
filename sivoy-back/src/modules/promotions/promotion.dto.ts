import {
  IsString,
  IsNotEmpty,
  IsArray,
  IsDate,
  IsDateString,
  IsBoolean,
} from 'class-validator';
import { Image } from 'src/entities/images.entity';

export class CreatePromotionDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsArray()
  images: Image[];

  @IsDate()
  validFrom: Date;

  @IsDate()
  validUntil: Date;

  isActive?: boolean;
}

export class UpdatePromotionDto {
  @IsString()
  name?: string;

  @IsString()
  description?: string;

  @IsArray()
  images: Image[];

  @IsDateString()
  validFrom?: Date;

  @IsDateString()
  validUntil?: Date;

  @IsBoolean()
  isActive?: boolean;
}
