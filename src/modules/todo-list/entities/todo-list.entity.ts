import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Todo } from '../../todo/entities/todo.entity';
import { User } from '../../users/entities/user.entity';

@Entity()
export class TodoList {
  @Column()
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany(() => Todo, (todo) => todo.todoList)
  todos: Todo[];

  @ManyToOne(() => User, (user) => user.todoList)
  user: User;
}
