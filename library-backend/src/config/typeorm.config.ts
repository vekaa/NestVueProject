/* eslint-disable prettier/prettier */
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { Book } from 'src/books/book.entity';
import { User } from 'src/users/user.entity';

export const typeOrmMySqlConfig: TypeOrmModuleOptions = {
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'library',
  //entities: [__dirname + '/../**/*.entity.ts'],
  //entities: ["src/**/**.entity{.ts,.js"],
  entities: [ Book, User ],
  synchronize: true,
};
