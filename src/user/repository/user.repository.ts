import { Injectable } from '@nestjs/common';
import { DatabaseService } from '../../database/database.service';
import { createModel, createRepository } from 'databless/dist/lib/repository';
import { User } from '../entity/user.entity';
import { Repository } from '../../database/interfaces/repository.interface';

@Injectable()
export class UserRepository extends Repository {
  constructor(dbService: DatabaseService) {
    super();
    // eslint-disable-next-line @typescript-eslint/ban-types
    this._model = createModel<User, {}>({
      adapter: () => dbService.knex,
      collectionName: DatabaseService.Tables.USERS,
      attributes: {
        id: { type: 'string' },
        username: { type: 'string' },
        email: { type: 'string' },
        createdAt: { type: 'date' },
        updatedAt: { type: 'date' },
      },
    });
    const repository = createRepository(this._model);

    this.detail = repository.detail;
    this.list = repository.list;
    this.count = repository.count;
    this.createBulk = repository.createBulk;
    this.delete = repository.delete;
    this.create = repository.create;
    this.update = repository.update;
  }
}
