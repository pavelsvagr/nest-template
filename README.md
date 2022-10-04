<center>
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="100" alt="Nest Logo" /></a>

# Nest template

Code template based on [Ackee node tepmlate](https://github.com/AckeeCZ/node-template) using Nest.js framework
</center>

## Features ✨

- All [Nest.js](https://docs.nestjs.com/) features as dependency injection, modules, routing, validation, ...
- [Config module](./src/config) using [Configuru](https://github.com/AckeeCZ/configuru)
- [Logger module](./src/logger) using [Cosmas](https://github.com/AckeeCZ/cosmas)
- [Database module](./src/database) using [knex.js](https://knexjs.org/) with PostgreSQL
- [Authentication middleware](./src/auth) with template for Bearer tokens implementation
  and [@Auth decorator](./src/auth/decorator/auth.decorator.ts) to inject current user
- [User module](./src/user) with simple controller for managing db users
  with [Databless](https://github.com/AckeeCZ/databless) repository

## Quick start 🚀

1. Run docker

```bash
cd docker-compose
docker-compose -p nest-template up
````

2. Install dependencies

```bash
npm i
npm i -g @nest/cli
```

3. Migrate database and prepare test users with ids `1`,`2` and `3` (see [seed file](./src/database/seeds/users.ts))

```bash
knex run migrate:latest
knex seed:run
```

4. Start the server

```bash
nest start
```