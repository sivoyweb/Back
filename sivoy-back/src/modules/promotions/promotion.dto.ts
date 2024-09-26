import {
  IsDate,
  IsDateString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreatePromotionDto {
  /**
   * Fecha válida para "validUntil"
   * @example "2024-12-31"
   */
  @IsNotEmpty()
  @IsDateString()
  validUntil: string;

  /**
   * Debe ser de tipo number, un número positivo del 1 al 100
   * @example 50
   */
  @IsOptional()
  @IsNumber()
  @Min(1)
  @Max(100)
  discound: number;
}
