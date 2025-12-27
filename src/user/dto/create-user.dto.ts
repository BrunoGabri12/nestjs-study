import { PickType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(150)
  @MinLength(3)
  username: string;

  @IsEmail()
  @IsNotEmpty()
  @MaxLength(255)
  email: string;

  @IsNotEmpty()
  @IsString()
  @IsStrongPassword()
  @MinLength(6)
  @MaxLength(128)
  password: string;
}

export class UserDo extends PickType(CreateUserDto, [
  'username',
  'email',
] as const) {
  @IsUUID()
  @IsNotEmpty()
  id: string;
}
