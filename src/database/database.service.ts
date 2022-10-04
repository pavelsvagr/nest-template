import { Injectable } from '@nestjs/common';
import { ConfigService } from '../config/config.service';
import knexConnect from 'knex';
import { applySnakes } from './utils/knex-snakecase.util';

@Injectable()
export class DatabaseService {
  static readonly Tables = {
    USERS: 'users',
  };

  private readonly _knex;
  private readonly _knexConfig;

  constructor(configService: ConfigService) {
    const { config } = configService;

    this._knexConfig = applySnakes({
      client: 'pg',
      // Cloud run uses sockets to connect to db
      connection: config.database.socketPath.length
        ? {
            host: config.database.socketPath,
            user: config.database.user,
            database: config.database.database,
            password: config.database.password,
          }
        : {
            host: config.database.host,
            port: config.database.port,
            user: config.database.user,
            database: config.database.database,
            password: config.database.password,
          },
    });

    this._knex = knexConnect(this._knexConfig);
  }

  public get knex() {
    return this._knex;
  }

  public get knexConfig() {
    return this._knexConfig;
  }
}
