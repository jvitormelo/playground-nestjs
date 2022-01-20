import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TodoModule } from './modules/todo/todo.module';
import { postgresConnection } from './config/postgres.connection';
import { Connection } from 'typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { JwtAuthGuard } from './common/guards/jwt-auth.guard';
import { APP_GUARD } from '@nestjs/core';
import { globalAuthConfig } from './config/global-auth.config';

@Module({
  imports: [
    TypeOrmModule.forRoot({ ...postgresConnection }),
    TodoModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService, globalAuthConfig],
})
export class AppModule {
  constructor(private connection: Connection) {}
}
