import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as express from 'express';
import * as path from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: false,
      transform: true,
    }),
  );

  app.enableCors();

  app.use('/exports', express.static(path.join(__dirname, '..', 'exports')));

  const swaggerConfig = new DocumentBuilder()
    .setTitle(`Si, voy`)
    .setDescription(
      `Esta es una API para el proyecto Si, voy. Construida utilizando NestJs `,
    )
    .addBearerAuth()
    .setVersion(`1.0`)
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);

  SwaggerModule.setup(`api`, app, document);

  await app.listen(3000);
}
bootstrap();
