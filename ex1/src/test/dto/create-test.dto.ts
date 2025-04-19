import { IsNotEmpty, IsNumber, Min } from 'class-validator';

export class CreateTestDto {
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @Min(1)
  age: number;
}
