import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

export class CreatePromotionDto {
  @IsNotEmpty()
  @IsString()
  @IsDate()
  date: string;

  @IsOptional()
  @IsNumber()
  discound: number;
}
