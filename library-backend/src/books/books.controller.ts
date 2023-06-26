import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { BooksService } from './books.service';
import { Book } from './book.entity';
import { CreateBookDto } from './dto/create-book.dto';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async getAllBooks(): Promise<Book[]> {
    const books = await this.booksService.getAllBooks();
    return books;
  }

  @Get('/:id')
  async getBookById(@Param('id') id: number): Promise<Book> {
    const book = await this.booksService.getBookById(id);
    if (!book) {
      throw new NotFoundException('user does not exist');
    } else {
      return book;
    }
  }

  @Get('/:id/users')
  async getUsersWithBook(@Param('id') id: number): Promise<Book> {
    return await this.booksService.getUsersWithBook(id);
  }

  @Post()
  async createBook(@Body() createBookDto: CreateBookDto): Promise<Book> {
    return await this.booksService.createBook(createBookDto);
  }

  @Put('/edit')
  async updateBook(
    @Query('id') id,
    @Body() createBookDto: CreateBookDto,
  ): Promise<Book> {
    //console.log(id);
    return await this.booksService.updateBook(id, createBookDto);
  }
}
