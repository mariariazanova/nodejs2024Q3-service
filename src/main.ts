import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import getSwaggerConfig from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));

  await getSwaggerConfig(app);
  // await app.listen(process.env.PORT || 4000, process.env.HOST || 'localhost');
  await app.listen(process.env.PORT || 4000, '::');

  console.log('Server started');
}

bootstrap();
