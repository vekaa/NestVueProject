import { IsString, MinLength, MaxLength, Matches } from "class-validator";

export class CreateUserDto {
  @IsString()
  @MinLength(4,{message: 'username too short'})
  @MaxLength(20, {message: 'username too long'})
  username: string;

  @IsString()
  // @Matches(/(?=^.{8,}$)((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$"/,
  //   {message:"password too week"})
  password: string;
}
