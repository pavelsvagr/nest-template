import { createLoader, values } from 'configuru';
import { applySnakes } from './src/database/utils/knex-snakecase.util';

const loader = createLoader({
  defaultConfigPath: '.env.jsonc',
});

const config = values({
  host: loader.string('SQL_HOST'),
  port: loader.number('SQL_PORT'),
  user: loader.string.hidden('SQL_USER'),
  database: loader.string('SQL_DATABASE'),
  password: loader.string.hidden('SQL_PASSWORD'),
  socketPath: loader.string.hidden('SOCKET_PATH'),
});

export = {
  ...applySnakes({
    client: 'pg',
    // Cloud run uses sockets to connect to db
    connection: config.socketPath.length
      ? {
          host: config.socketPath,
          user: config.user,
          database: config.database,
          password: config.password,
        }
      : {
          host: config.host,
          port: config.port,
          user: config.user,
          database: config.database,
          password: config.password,
        },
  }),
  migrations: {
    directory: './src/database/migrations',
    extension: 'ts',
  },
  seeds: {
    directory: './src/database/seeds',
    extension: 'ts',
  },
};
