import { PickType } from '@nestjs/mapped-types';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { IsDifferent } from 'src/common/validators/is-different.validator';
import { UserDo } from 'src/user/dto/create-user.dto';

export class CreateLetterDto {
  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  @IsNotEmpty()
  letter: string;

  @IsUUID()
  @IsNotEmpty()
  fromId: string;

  @IsUUID()
  @IsNotEmpty()
  @IsDifferent('fromId', {
    message: 'O id do destinatário deve ser diferente do id do remetente',
  })
  toId: string;
}

export class LetterDto {
  @IsUUID()
  @IsNotEmpty()
  id: string;

  @IsString()
  @MinLength(10)
  @MaxLength(5000)
  @IsNotEmpty()
  letter: string;

  from: UserLetter;

  to: UserLetter;

  @IsNotEmpty()
  sendAt: Date;

  @IsOptional()
  readAt?: Date;
}

export class UserLetter extends PickType(UserDo, ['id', 'email'] as const) {}
