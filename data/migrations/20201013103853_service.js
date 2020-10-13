exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('Service', function (table) {
      table.string('id').notNullable().unique().primary();
      table.string('name');
      table.string('start_date');
      table.string('end_date');
      table.string('start_time');
      table.string('end_time');
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('Service');
};
