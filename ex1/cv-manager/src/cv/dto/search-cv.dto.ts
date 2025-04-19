import { IsOptional, IsNumber, IsString } from 'class-validator';

export class SearchCvDto {
  @IsOptional()
  @IsString()
  search?: string;

  @IsOptional()
  @IsNumber()
  age?: number;
} 