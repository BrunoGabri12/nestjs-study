import { IsNumberString, Min } from 'class-validator';

export class PaginationDto {
  @IsNumberString()
  @Min(0)
  offset: number = 0;

  @IsNumberString()
  @Min(0)
  limit: number = 10;
}
