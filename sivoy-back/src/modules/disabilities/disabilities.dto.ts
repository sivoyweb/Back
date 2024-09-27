import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class addDisabilityDto {
  @IsNotEmpty()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsNotEmpty()
  @IsString()
  category: string;
}

export class UpdateDisabilityDto {
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(50)
  name: string;

  @IsString()
  @IsOptional()
  category: string;
}
