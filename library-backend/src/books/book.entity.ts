/* eslint-disable prettier/prettier */
import { User } from 'src/users/user.entity';
import { BaseEntity, Column, Entity, JoinTable, ManyToMany, ManyToOne, PrimaryGeneratedColumn} from 'typeorm';

@Entity()
export class Book extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string; 

  @Column()
  author: string;

  @Column()
  numberOfCopies: number;

  @ManyToMany(() => User, (users) => users.books)
  @JoinTable()
  users: User[];
}
