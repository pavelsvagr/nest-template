import { Module } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { LoggerMiddleware } from './logger.middleware';
import { ConfigModule } from '../config/config.module';
import LoggerInterceptor from './interceptor/logger.interceptor';

@Module({
  imports: [ConfigModule],
  providers: [LoggerService, LoggerMiddleware, LoggerInterceptor],
  exports: [LoggerService, LoggerMiddleware, LoggerInterceptor],
})
export class LoggerModule {}
