exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('Pet', function (table) {
      table.string('id').notNullable().unique().primary();
      table.string('description');
      table.string('name');
      table.string('photo_url').unique();
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('Pet');
};
