import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

async function bootstrap() {
  process.env.NODE_ENV =
    process.env.NODE_ENV == null ? 'dev' : process.env.NODE_ENV;

  if (process.env.NODE_ENV === 'dev') {
    dotenv.config({
      path: 'envs/.env',
    });
  }

  console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(3000);
}
bootstrap();
