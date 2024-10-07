import { IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { Image } from 'src/entities/images.entity';

export class CreateAllianceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  image: Image;
}

export class UpdateAllianceDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  image?: Image;
}
