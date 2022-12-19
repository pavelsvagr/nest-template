import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { catchError, Observable, single } from 'rxjs';
import { LoggerService } from '../logger.service';

@Injectable()
export default class LoggerInterceptor implements NestInterceptor {
  constructor(private readonly _logger: LoggerService) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<any> | Promise<Observable<any>> {
    const fnName = `${context.getClass().name}.${context.getHandler().name}`;
    this._logger.debug({ params: context.getArgs() }, `Called ${fnName}`);
    return next.handle().pipe(
      single((res) => {
        this._logger.debug({ res }, `Returned ${fnName}`);
        return res;
      }),
      catchError((err) => {
        this._logger.debug({ err }, `Error thrown during ${fnName}`);
        throw err;
      }),
    );
  }
}
