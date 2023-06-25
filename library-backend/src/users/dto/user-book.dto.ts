import { IsBoolean } from "class-validator";

export class UserBookDto {
  userId: number;
  bookId: number;

  @IsBoolean({message: "Value is not boolean"})
  isRent: boolean;
}
