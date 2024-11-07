import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import getSwaggerConfig from './swagger/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  // await getSwaggerConfig(app);

  await app.listen(4000);
  console.log(
    `Server started: ${await app.getUrl()} \nApi documentation:  ${await app.getUrl()}/doc`,
  );
}

bootstrap();
