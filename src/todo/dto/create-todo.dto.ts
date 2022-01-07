import { IsBoolean, IsOptional, IsString } from 'class-validator';
import { AbstractDTO } from '../../common/utils/AbstractDTO';

export class CreateTodoDto extends AbstractDTO {
  @IsString()
  title: string;

  @IsOptional()
  @IsBoolean()
  isDone: boolean;
}
