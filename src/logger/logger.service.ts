import { Injectable } from '@nestjs/common';
import logger, { Cosmas } from 'cosmas';
import { ConfigService } from '../config/config.service';

@Injectable()
export class LoggerService implements LoggerService {
  private readonly _logger: Cosmas;

  constructor(configService: ConfigService) {
    this._logger = logger(configService.config.logger);
  }

  log(message: any, ...optionalParams: any[]) {
    this._logger.info(optionalParams, message);
  }

  /**
   * Write an 'error' level log.
   */
  error(message: any, ...optionalParams: any[]) {
    this._logger.error(optionalParams, message);
  }

  /**
   * Write a 'warn' level log.
   */
  warn(message: any, ...optionalParams: any[]) {
    this._logger.warn(optionalParams, message);
  }

  /**
   * Write a 'debug' level log.
   */
  debug(message: any, ...optionalParams: any[]) {
    this._logger.debug(optionalParams, message);
  }

  /**
   * Write a 'verbose' level log.
   */
  verbose(message: any, ...optionalParams: any[]) {
    this._logger.info(optionalParams, message);
  }
}
