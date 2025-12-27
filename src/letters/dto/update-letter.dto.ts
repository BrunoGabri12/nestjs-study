import { PickType } from '@nestjs/mapped-types';
import { CreateLetterDto } from './create-letter.dto';

export class UpdateLetterDto extends PickType(CreateLetterDto, [
  'fromId',
  'toId',
] as const) {}
 