import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AddImageDto {
  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  publicId: string;

  @IsNotEmpty()
  @IsString()
  alt: string;
}

export class UpdateImageDto {
  @IsOptional()
  @IsString()
  url: string;

  @IsOptional()
  @IsString()
  publicId: string;

  @IsOptional()
  @IsString()
  alt: string;
}
