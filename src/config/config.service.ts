import { Injectable } from '@nestjs/common';
import { createLoader, safeValues, values } from 'configuru';
import { Level } from 'cosmas';

@Injectable()
export class ConfigService {
  protected readonly _schema;
  protected readonly _config;
  protected readonly _safeConfig;

  constructor() {
    const loader = createLoader({
      defaultConfigPath: '.env.jsonc',
    });

    this._schema = {
      logger: {
        defaultLevel: loader.custom((x) => x as Level)('LOGGER_DEFAULT_LEVEL'),
        pretty: loader.bool('LOGGER_PRETTY'),
      },
      auth: {
        directBearerAuth: loader.bool('AUTH_DIRECT_BEARER_ENABLED'),
      },
      enableTests: loader.bool('ENABLE_TESTS'),
      node: {
        env: loader.string('NODE_ENV'),
      },
      server: {
        port: loader.number('SERVER_PORT'),
      },
      database: {
        host: loader.string('SQL_HOST'),
        port: loader.number('SQL_PORT'),
        user: loader.string.hidden('SQL_USER'),
        database: loader.string('SQL_DATABASE'),
        password: loader.string.hidden('SQL_PASSWORD'),
        socketPath: loader.string.hidden('SOCKET_PATH'),
      },
    };

    this._config = values(this._schema);
    this._safeConfig = safeValues(this._schema);
  }

  public get config() {
    return this._config;
  }

  public get safeConfig() {
    return this._safeConfig;
  }
}
