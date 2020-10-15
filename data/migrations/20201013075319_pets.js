exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('pets', function (table) {
      table.string('id').notNullable().unique().primary();
      table.text('description');
      table.string('name', 128);
      table.string('photo_url');
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('pets');
};
