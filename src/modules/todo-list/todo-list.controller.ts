import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { UserRequest } from '../../common/decorators/user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('todos-list')
export class TodoListController {
  constructor(private readonly todoListService: TodoListService) {}

  @Post()
  create(
    @Body() createTodoListDto: CreateTodoListDto,
    @UserRequest() user: User,
  ) {
    return this.todoListService.create(createTodoListDto, user.id);
  }

  @Get()
  findAll(@UserRequest() user: User) {
    return this.todoListService.findAll(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.todoListService.findOne(+id);
  }

  @Put(':id')
  update(
    @Param('id') id: string,
    @Body() updateTodoListDto: UpdateTodoListDto,
  ) {
    return this.todoListService.update(+id, updateTodoListDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.todoListService.remove(+id);
  }
}
