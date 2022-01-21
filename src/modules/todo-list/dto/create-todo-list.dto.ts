import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTodoListDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsOptional()
  description: string;
}
