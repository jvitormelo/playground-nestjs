import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './modules/todo/todo.module';
import { postgresConnection } from './config/postgres.connection';
import { Connection } from 'typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { globalAuthConfig } from './config/global-auth.config';
import { TodoListModule } from './modules/todo-list/todo-list.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...postgresConnection }),
    TodoModule,
    UsersModule,
    AuthModule,
    TodoListModule,
  ],

  providers: [globalAuthConfig],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
