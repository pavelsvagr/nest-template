import { Knex } from 'knex';
import { DatabaseService } from '../database.service';

export async function seed(knex: Knex): Promise<void> {
  await knex(DatabaseService.Tables.USERS).del();
  await knex(DatabaseService.Tables.USERS).insert([
    { id: 1, email: 'test@example.org', username: 'admin' },
    { id: 2, email: 'test2@example.org', username: 'test' },
    { id: 3, email: 'user@ackee.cz', username: 'user' },
  ]);
}
