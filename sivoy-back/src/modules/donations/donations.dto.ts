import {
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsObject,
  IsString,
  IsUUID,
} from 'class-validator';

export class CreateDonationDto {
  @IsNotEmpty({ message: 'El email no puede estar vacío' })
  @IsEmail({}, { message: 'El email debe tener un formato válido' })
  email: string;

  @IsNotEmpty({ message: 'El nombre no puede estar vacío' })
  @IsString({ message: 'El nombre debe ser una cadena' })
  name: string;

  @IsNotEmpty({ message: 'El monto no puede estar vacío' })
  @IsNumber({}, { message: 'El monto debe ser un número' })
  unit_price: number;

  @IsString({ message: 'La descripción debe ser una cadena' })
  description?: string;
}

export class PaymentDataDto {
  @IsUUID()
  @IsNotEmpty()
  donationId: string;
}

export class PaymentNotificationDto {
  @IsString()
  action: string;

  @IsString()
  api_version: string;

  @IsUUID()
  id: string;

  data: { 
    id: string;
  }

  @IsString()
  date_created: string;

  @IsString()
  live_mode: boolean;

  @IsString()
  type: string;

  @IsString()
  user_id: string;
}
