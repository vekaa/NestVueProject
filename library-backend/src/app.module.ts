import { Module } from '@nestjs/common';
import { BooksModule } from './books/books.module';
import { UsersModule } from './users/users.module';
import { typeOrmMySqlConfig } from './config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmMySqlConfig),
    BooksModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
