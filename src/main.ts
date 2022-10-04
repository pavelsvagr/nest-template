import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import * as pkg from 'package.json';
import { ConfigService } from './config/config.service';
import { HttpStatus, ValidationPipe } from '@nestjs/common';
import { LoggerService } from './logger/logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
    bufferLogs: true,
  });

  const configService = app.get<ConfigService>(ConfigService);
  const loggerService = app.get<LoggerService>(LoggerService);

  app.useLogger(loggerService);
  app.useGlobalPipes(
    new ValidationPipe({
      errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
    }),
  );

  // Swagger setup
  const swaggerConfig = new DocumentBuilder()
    .setTitle(pkg.name)
    .setDescription(pkg.description)
    .setVersion(pkg.version)
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  await app.listen(configService.config.server.port);
}

bootstrap();
