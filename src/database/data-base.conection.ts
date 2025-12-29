import { Injectable } from '@nestjs/common';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

//Irá exportar as configurações do banco de dados.
//Seria adequado criar modulos diferentes para cada banco ?

@Injectable()
export class DataBaseConection {
  private static readonly dbConfigs: Record<string, TypeOrmModuleOptions> = {
    postgres: {
      type: 'postgres',
      host: process.env.DB_HOST || 'localhost',
      port: parseInt(process.env.DB_PORT || '', 10) || 5432,
      username: process.env.DB_USERNAME || 'user',
      password: process.env.DB_PASSWORD || 'password',
      database: process.env.DB_NAME || 'database',
      synchronize: !!process.env.SYNCRHONIZE, // Apenas para desenvolvimento
      autoLoadEntities: true, // Apenas para desenvolvimento
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
    },
  };

  static getConfig(dbType: 'postgres') {
    return this.dbConfigs[dbType];
  }
}
