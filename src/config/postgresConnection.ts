import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Todo } from 'src/todo/entities/todo.entity';

export default (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Todo],
  synchronize: process.env.NODE_ENV !== 'production',
});
