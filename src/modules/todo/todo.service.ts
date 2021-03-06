import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTodoDto } from './dto/create-todo.dto';
import { UpdateTodoDto } from './dto/update-todo.dto';
import { Todo } from './entities/todo.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class TodoService {
  constructor(
    @InjectRepository(Todo)
    private todoRepository: Repository<Todo>,
  ) {}

  async create(createTodoDto: CreateTodoDto) {
    return await this.todoRepository.save(createTodoDto);
  }

  findAll() {
    return this.todoRepository.find({ order: { createdAt: 'DESC' } });
  }

  async findOne(id: number) {
    const todo = await this.todoRepository.findOne(id);
    if (!todo) throw new NotFoundException('Todo não encontrado');

    return todo;
  }

  // TODO retornar o objeto inteiro atualizado
  update(id: number, updateTodoDto: UpdateTodoDto) {
    return this.todoRepository.save({ ...updateTodoDto, id });
  }

  remove(id: number) {
    return this.todoRepository.delete(id);
  }
}
