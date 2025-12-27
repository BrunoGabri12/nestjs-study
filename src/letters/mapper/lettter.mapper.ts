import { LetterDto } from '../dto/create-letter.dto';
import { Letter } from '../entities/letter.entity';

export class LetterMapper {
  public static toDto(entity: Letter): LetterDto {
    return {
      id: entity.id,
      letter: entity.letter,
      from: {
        id: entity.from.id,
        email: entity.from.email,
      },
      to: {
        id: entity.to.id,
        email: entity.to.email,
      },
      sendAt: entity.sendAt,
      readAt: entity.readAt,
    };
  }
}
