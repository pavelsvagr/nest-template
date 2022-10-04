import { Injectable, NestMiddleware } from '@nestjs/common';
import { LoggerService } from './logger.service';
import { pick } from 'lodash';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  private readonly _logger: LoggerService;

  constructor(loggerService: LoggerService) {
    this._logger = loggerService;
  }

  use(req: any, res: any, next: () => void) {
    this._logger.log(
      { req: pick(req, ['headers', 'httpVersion', 'method', 'url', 'body']) },
      'Received request',
    );
    next();
  }
}
