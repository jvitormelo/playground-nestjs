import { Module } from '@nestjs/common';
import { TodoListService } from './todo-list.service';
import { TodoListController } from './todo-list.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoList } from './entities/todo-list.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TodoList])],
  controllers: [TodoListController],
  providers: [TodoListService],
})
export class TodoListModule {}
