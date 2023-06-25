import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { Book } from 'src/books/book.entity';
import { NotFoundError } from 'rxjs';
import e from 'express';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Book)
    private bookRepositoty: Repository<Book>,
  ) {}

  async getAllUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async getBooksOfUser(id: number) {
    const user = await this.userRepository.findOne({
      where: { id },
      relations: ['books'],
    });
    if (!user) {
      throw new NotFoundException('"User not exist"');
    }
    return user;
  }

  async getUserById(id: number) {
    return await this.userRepository.findOne({
      where: { id },
      relations: { books: true },
    });
  }

  async createUser(createUserDto: CreateUserDto): Promise<void> {
    const newUser = this.userRepository.create({
      ...createUserDto,
    });
    newUser.books = [];
    try {
      await this.userRepository.save(newUser);
    } catch (error) {
      //console.log(error);
      if(error.code === 'ER_DUP_ENTRY'){
        throw new ConflictException("Username already exist");
      } else {
        throw new InternalServerErrorException();
      }
    }
  }

  async signIn(createUserDto: CreateUserDto): Promise<boolean> {
    const { username, password } = createUserDto;
    const user = await this.userRepository.findOne({ where: { username } });

    if( user?.password === password){
      return true;
    } else {
      throw new UnauthorizedException('Invalid credentials');
    }
  }

  async userRentBook(user: User, book: Book, rent: boolean) {
    //console.log(user, book, rent);
    if (rent == true) {
      //user.books = [...user.books, book];
      if (book.numberOfCopies > 1) {
        if (book.users.some(b => b.id === book.id)) {
          throw new ConflictException('User have this book');
        }
        book.users = [...book.users, user];
        book.numberOfCopies -= 1;
      } else {
        throw new NotFoundException('Dont have any this book');
      }
    } else {
      //user.books = user.books.filter((b) => b.id !== book.id);
      book.users = book.users.filter((u) => u.id !== user.id);
      book.numberOfCopies += 1;
    }

    //await this.userRepository.save(user);
    return await this.bookRepositoty.save(book);
  }
}
