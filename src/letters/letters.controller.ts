import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
  Query,
  ParseUUIDPipe,
  UseInterceptors,
} from '@nestjs/common';
import { LettersService } from './letters.service';
import { CreateLetterDto } from './dto/create-letter.dto';
import { UpdateLetterDto } from './dto/update-letter.dto';
import { LoggerInterceptor } from 'src/common/interceptors/logger/logger.interceptor';
import { SimpleCacheInterceptor } from 'src/common/interceptors/simple-cache/simple-cache.interceptor';

@Controller('letters')
@UseInterceptors(LoggerInterceptor)
@UseInterceptors(SimpleCacheInterceptor)
export class LettersController {
  constructor(private readonly lettersService: LettersService) {}

  @Post()
  create(@Body() createLetterDto: CreateLetterDto) {
    return this.lettersService.create(createLetterDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  findAll(/*@Query() pagination: PaginationDto*/) {
    return this.lettersService.findAll(/*pagination*/);
    return; // this.lettersService.findAll(pagination);
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  findOne(@Param('id', ParseUUIDPipe) id: string) {
    return this.lettersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseUUIDPipe) id: string,
    @Body() updateLetterDto: UpdateLetterDto,
  ) {
    return this.lettersService.update(+id, updateLetterDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseUUIDPipe) id: string) {
    return this.lettersService.remove(+id);
  }
}
