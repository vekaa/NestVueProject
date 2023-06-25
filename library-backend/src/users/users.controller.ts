import { Body, Controller, Get, NotFoundException, Param, Patch, Post, ValidationPipe} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UserBookDto } from './dto/user-book.dto';
import { BooksService } from 'src/books/books.service';

@Controller('users')
export class UsersController {
  constructor(
    private usersService: UsersService,
    private booksService: BooksService,
  ) {}

  @Get()
  async getAllUsers(): Promise<User[]> {
    return await this.usersService.getAllUsers();
  }

  @Get('/:id')
  async getUserById(@Param('id') id: number) {
    const user = await this.usersService.getUserById(id);
    if (!user) {
      throw new NotFoundException('user does not exist');
    } else {
      return user;
    }
  }

  @Get('/books/:id')
  async getBooksOfUser(@Param('id') id: number) {
    return await this.usersService.getBooksOfUser(id);
  }

  @Post()
  async createUser(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<void> {
    await this.usersService.createUser(createUserDto);
  }

  @Post('/signin')
  async signIn(
    @Body(ValidationPipe) createUserDto: CreateUserDto,
  ): Promise<boolean> {
    return await this.usersService.signIn(createUserDto);
  }

  @Patch('/update')
  async updateUserBooks(@Body(ValidationPipe) userBookDto: UserBookDto) {
    //console.log(userBookDto);
    const user = await this.usersService.getUserById(userBookDto.userId);
    if (!user) {
      throw new NotFoundException('User does not exist');
    }

    const book = await this.booksService.getBookById(userBookDto.bookId);
    if (!book) {
      throw new NotFoundException('Book does not exist');
    }
    return await this.usersService.userRentBook(user, book, userBookDto.isRent);
  }
}
