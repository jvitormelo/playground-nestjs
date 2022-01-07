import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { TodoModule } from './todo/todo.module';
import postgresConnection from './config/postgresConnection';
import { Connection } from 'typeorm';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, load: [postgresConnection] }),
    TodoModule,
    TypeOrmModule.forRoot(postgresConnection()),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
