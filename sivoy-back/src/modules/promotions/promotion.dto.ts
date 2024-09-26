import {
  IsDate,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  Max,
  Min,
} from 'class-validator';

export class CreatePromotionDto {
  /**
   * Debe ser una fecha valida
   * @example "01/01/1991"
   */
  @IsNotEmpty()
  @IsDate()
  date: string;

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
