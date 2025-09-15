// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);
//   await app.listen(3000);
// }
// bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

export async function createApp() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:
      process.env.CORS_ORIGIN?.split(',').map((value) => value.trim()) ?? true,
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  });
  app.useGlobalPipes(new ValidationPipe({ whitelist: true, transform: true }));
  await app.init();
  return app;
}

const createLocalApp = async () => {
  const app = await createApp();
  await app.listen(process.env.PORT ?? 3000);
  console.log(`🚀 http://localhost:${process.env.PORT ?? 3000}/graphql`);
};

if (!process.env.VERCEL) {
  createLocalApp();
}
