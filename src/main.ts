import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

const { TEST_VARIABLE } = process.env;

async function bootstrap() {
  console.log(TEST_VARIABLE);
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
