import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

/*
Irá inicializar a aplicação. É possível modificar a inicializaão no nest-cli.json
disableErrorMessages: true -> desabilita mensagens de erro detalhadas na validação. Sempre deixar true em produção.
isso ajuda a evitar vazamento de informações sensíveis sobre a estrutura interna da aplicação.
*/

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      disableErrorMessages: false, //não exibe mensagens de erro detalhadas
      whitelist: true, // Remove propriedades não definidas nos DTOs
      forbidNonWhitelisted: true, // Lança um erro se propriedades não definidas forem encontradas
      transform: true, // Converte automaticamente os tipos de dados com base nos DTOs
    }),
  ); // Habilita validação global usando DTOs

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
