import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { createHash } from '../../../common/utils/hash.util';
import { TodoList } from '../../todo-list/entities/todo-list.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude({ toPlainOnly: true })
  password: string;

  @Column({ default: '', type: 'varchar' })
  name: string;

  @Column()
  cellphone: string;

  @OneToMany(() => TodoList, (todoList) => todoList.user)
  todoList: TodoList[];

  // Criar a logica se deve hashear
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await createHash(this.password);
  }
}
