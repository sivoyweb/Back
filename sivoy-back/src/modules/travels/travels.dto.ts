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
  minLength,
  MinLength,
} from 'class-validator';
import { Image } from 'src/entities/images.entity';
import { Review } from 'src/entities/review.entity';

export class CreateTravelDto {
  /**
   * Debe ser un string de entre 3 y 255 caracteres,
   * @example "Complejo Punta Mogotes"
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(255)
  name: string;

  /**
   * Debe ser un string con nombre de pais valido, entre 3 y 50 caracteres
   * @example "Argentina"
   */
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  country: string;

  /**
   * Debe ser un string con nombre de ciudad entre 3 y 50 caracteres
   * @example "Buenos Aires"
   */

  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  city: string;

  /**
   * Debe ser una fecha valida
   * @example "01/01/1991"
   */
  @IsDateString()
  @IsOptional()
  date?: string;

  /**
   * Debe ser un valor numerico y positivo
   * @example "99.99"
   */
  @IsNumber()
  @IsPositive()
  @IsOptional()
  price: number;

  /**
   * Debe ser un string con un maximo de 255 caracteres
   * @example "Ésta es una breve descrpción del Viaje"
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  description: string;

  /**
   * Debe ser un string que describa el tipo de servicio
   * @example "Playa y atracciones acuaticas"
   */
  @IsString()
  @IsOptional()
  serviceType: string;

  /**
   * Sello de accesibilidad
   *
   */
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  accesibilitySeal: string;

  /**
   * Debe ser un array con los viajes realizados por el usuario
   * @example ["id: `abc123`, name: `Complejo Punta Mogotes` price: `99.99`" , "..."]
   */
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  reviews: Partial<Review[]>;

  /**
   * Debe ser un array de urls de imagenes
   * @example ["https://www.ejemplodenoticia.com/deportes/futbol" , "..."]
   */
  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  images: Partial<Image[]>;

  /**
   * Debe ser un numero
   */
  @IsNotEmpty()
  @IsNumber()
  stars: number;
}
