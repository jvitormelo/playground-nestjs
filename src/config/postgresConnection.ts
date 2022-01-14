import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Todo } from 'src/modules/todo/entities/todo.entity';
import { User } from '../modules/users/entities/user.entity';

export default (): TypeOrmModuleOptions => ({
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [Todo, User],
  synchronize: process.env.NODE_ENV !== 'production',
});
