import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerMiddleware } from './logger.middleware';
import { ConfigModule } from '../config/config.module';

@Module({
  imports: [ConfigModule],
  providers: [LoggerService, LoggerMiddleware],
  exports: [LoggerService, LoggerMiddleware],
})
export class LoggerModule {}
