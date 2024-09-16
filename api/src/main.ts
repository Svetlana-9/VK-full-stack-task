import { NestFactory,  } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe, } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common/enums';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    errorHttpStatusCode: HttpStatus.METHOD_NOT_ALLOWED,
  }));
  await app.listen(3000);
}
bootstrap();
