import { Injectable } from '@nestjs/common';
import { CreateTodoListDto } from './dto/create-todo-list.dto';
import { UpdateTodoListDto } from './dto/update-todo-list.dto';
import { Repository } from 'typeorm';
import { TodoList } from './entities/todo-list.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class TodoListService {
  constructor(
    @InjectRepository(TodoList)
    private todoListRepository: Repository<TodoList>,
  ) {}

  async create(createTodoListDto: CreateTodoListDto, userId: number) {
    console.log(userId);
    const todoList = await this.todoListRepository.create({
      ...createTodoListDto,
      user: { id: userId },
    });
    return this.todoListRepository.save(todoList);
  }

  findAll() {
    return this.todoListRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} todoList`;
  }

  update(id: number, updateTodoListDto: UpdateTodoListDto) {
    return `This action updates a #${id} todoList`;
  }

  remove(id: number) {
    return `This action removes a #${id} todoList`;
  }
}
