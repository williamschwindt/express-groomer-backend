exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('Pet', function (table) {
      table.integer('id').notNullable().unique().primary();
      table.text('description', 128);
      table.string('name', 128);
      table.string('photo_url', 128).unique();
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('Pet');
};
