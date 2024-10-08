import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';
import { Image } from 'src/entities/images.entity';

export class CreateAllianceDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  image: Image;

  @IsNotEmpty()
  @IsUrl()
  url: string;
}

export class UpdateAllianceDto {
  @IsOptional()
  @IsString()
  name?: string;

  @IsOptional()
  image?: Image;

  @IsOptional()
  @IsUrl()
  url?: string;
}
