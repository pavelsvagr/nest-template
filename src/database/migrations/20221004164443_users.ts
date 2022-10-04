import { Knex } from 'knex';
import { DatabaseService } from '../database.service';

export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable(DatabaseService.Tables.USERS, (tb) => {
    tb.bigIncrements('id').primary();
    tb.string('email', 265);
    tb.text('username');
    tb.datetime('createdAt', { useTz: true, precision: 3 }).defaultTo(
      knex.fn.now(),
    );
    tb.datetime('updatedAt', { useTz: true, precision: 3 });
  });
}

export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable(DatabaseService.Tables.USERS);
}
