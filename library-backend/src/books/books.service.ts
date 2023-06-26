/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Book } from './book.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateBookDto } from './dto/create-book.dto';
import { User } from 'src/users/user.entity';

@Injectable()
export class BooksService {
    constructor(
        @InjectRepository(Book)
        private bookRepository: Repository<Book>,
    ){}

    async getAllBooks(){
        return await this.bookRepository.find();
    }
    

    async getBookById(id: number) {
        return await this.bookRepository.findOne({ where: { id }, relations: {users: true} });
    }

    async getUsersWithBook(id: number) {
        const book = await this.bookRepository.findOne({
          where: { id },
          relations: ['users'],
        });
        if (!book) {
          throw new NotFoundException('Book not exist');
        }
        return book;
      }

    async createBook(createBookDto: CreateBookDto){
        const newBook = await this.bookRepository.save({
            ...createBookDto
        });
        newBook.users = [];

        return newBook;
    }

    async updateBook(id:number, createBookDto: CreateBookDto) {
        const editBook = await this.getBookById(id);
        if (!editBook){
            throw new NotFoundException('Book not exist');
        }
        
        Object.assign(editBook, createBookDto);

        return await this.bookRepository.save(editBook);

    }
}
