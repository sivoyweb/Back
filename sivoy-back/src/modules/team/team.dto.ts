import { IsString, IsNotEmpty, IsOptional, IsUrl } from 'class-validator';

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
  }