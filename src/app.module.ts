import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LettersModule } from './letters/letters.module';
import { CommonModule } from './common/common.module';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { DatabaseModule } from './database/database.module';
import { DataBaseConection } from './database/data-base.conection';
import { UserModule } from './user/user.module';
import {
  ONLY_LOWERCASE,
  REMOVE_SPACES,
  SERVER_NAME,
} from './common/constants/server-name.constant';
import { OnlyLowerCaseRegex } from './common/regex/only-lowercase.regex';
import { RemoveSpacesRegex } from './common/regex/remove-spaces.regex';
import { DynamicTestModule } from './dynamic-test/dynamic-test.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: SERVER_NAME,
      useValue: 'MyNestServer',
    },
    {
      provide: ONLY_LOWERCASE,
      useValue: OnlyLowerCaseRegex,
    },
    {
      provide: REMOVE_SPACES,
      useValue: RemoveSpacesRegex,
    },
  ],
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV || 'development'}`,
      isGlobal: true,
      //ignoreEnvFile: false, -> para servdores que ja tem variaveis de ambiente setadas
    }),
    LettersModule,
    CommonModule,
    TypeOrmModule.forRootAsync({
      useFactory: async (): Promise<TypeOrmModuleOptions> => {
        return DataBaseConection.getConfig('postgres');
      },
    }),
    DatabaseModule,
    UserModule,
    DynamicTestModule,
  ],
})
export class AppModule {}
