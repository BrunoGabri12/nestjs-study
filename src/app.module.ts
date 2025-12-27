import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LettersModule } from './letters/letters.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { DataBaseConection } from './database/data-base.conection';
import { UserModule } from './user/user.module';

@Module({
  controllers: [AppController],
  providers: [AppService],
  imports: [
    LettersModule,
    CommonModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return DataBaseConection.getConfig('postgres');
      },
    }),
    DatabaseModule,
    UserModule,
  ],
})
export class AppModule {}
