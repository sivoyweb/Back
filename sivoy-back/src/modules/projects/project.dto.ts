import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';

export class CreateProjectDto {

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;
}
export class UpdateProjectDto {
    
    @IsOptional()
    @IsString()
    @MaxLength(255)
    name?: string;
  
    @IsOptional()
    @IsString()
    @MaxLength(255)
    description?: string;
  }