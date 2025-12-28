import { Injectable } from '@nestjs/common';
import { CreateLetterDto, LetterDto } from './dto/create-letter.dto';
import { UpdateLetterDto } from './dto/update-letter.dto';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { UserService } from 'src/user/user.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Letter } from './entities/letter.entity';
import { LetterMapper } from './mapper/lettter.mapper';

@Injectable()
export class LettersService {
  constructor(
    @InjectRepository(Letter)
    private readonly letterRepository: Repository<Letter>,
    private readonly userService: UserService,
  ) {}

  async create(createLetterDto: CreateLetterDto): Promise<LetterDto> {
    await this.userService.existsById(createLetterDto.fromId);
    await this.userService.existsById(createLetterDto.toId);

    const letter = this.letterRepository.create({
      letter: createLetterDto.letter,
      from: { id: createLetterDto.fromId },
      to: { id: createLetterDto.toId },
      sendAt: new Date(),
    });
    const savedLetter = await this.letterRepository.save(letter);

    const letterWithRelations = await this.letterRepository.findOne({
      where: { id: savedLetter.id },
      relations: ['from', 'to'],
    });

    if (!letterWithRelations) {
      throw new Error('Letter not found after saving');
    }

    return LetterMapper.toDto(letterWithRelations);
  }

  findAll(pagination?: PaginationDto) {
    throw new Error('Method not implemented.');
    return `This action returns all letters`;
  }

  findOne(id: number) {
    return `This action returns a #${id} letter`;
  }

  update(id: number, updateLetterDto: UpdateLetterDto) {
    return `This action updates a #${id} letter`;
  }

  remove(id: number) {
    return `This action removes a #${id} letter`;
  }
}
