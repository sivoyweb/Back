import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateDonationDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsNotEmpty()
  @IsNumber()
  unit_price: number;

  @IsNotEmpty()
  @IsString()
  description: string;
}
