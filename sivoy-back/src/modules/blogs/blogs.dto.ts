import { IsString, IsNotEmpty, IsArray, IsOptional, ArrayMinSize } from 'class-validator';
import { Image } from 'src/entities/images.entity';

export class CreateBlogDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsOptional()
  @IsArray()
  @ArrayMinSize(1)
  images?: Partial<Image[]>;
}
