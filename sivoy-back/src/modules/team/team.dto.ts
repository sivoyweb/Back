import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';
import { Image } from 'src/entities/images.entity';

export class CreateTeamDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  description: string;

  @IsOptional()
  @IsUrl()
  linkedin?: string;

  @IsNotEmpty()
  image: Partial<Image>;
}

export class UpdateTeamDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsOptional()
  @IsUrl()
  linkedin?: string;

  @IsOptional()
  image?: Partial<Image>;
}
