import { Module } from '@nestjs/common';
import { LettersService } from './letters.service';
import { LettersController } from './letters.controller';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Letter } from './entities/letter.entity';

@Module({
  controllers: [LettersController],
  providers: [LettersService],
  imports: [UserModule, TypeOrmModule.forFeature([Letter])],
})
export class LettersModule {}
