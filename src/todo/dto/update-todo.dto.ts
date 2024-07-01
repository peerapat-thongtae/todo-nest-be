import { IsBoolean, IsOptional } from 'class-validator';

export class UpdateTodoDto {
  @IsBoolean()
  @IsOptional()
  completed?: boolean;

  @IsOptional()
  title?: string;

  @IsOptional()
  description?: string;
}
