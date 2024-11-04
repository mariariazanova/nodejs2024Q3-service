import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationError, ValidationPipe } from '@nestjs/common';
// import { customExceptionFactory } from './utils/validation-error.factory';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // transform: true,
      // exceptionFactory: customExceptionFactory,
      // exceptionFactory: (errors: ValidationError[]) => {
      //   console.log(errors);
      //
      //   return errors;
      // },
    }),
  );

  await app.listen(4000);
  console.log(
    `Server started: ${await app.getUrl()} \nApi documentation:  ${await app.getUrl()}/doc`,
  );
}
bootstrap();
