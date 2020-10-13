exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('Customer', function (table) {
      table.string('id').notNullable().unique().primary();
      table.string('description');
      table.string('name').notNullable();
      table.string('lastname').notNullable();
      table.string('address').notNullable();
      table.string('zip');
      table.string('phone').notNullable().unique();
      table.string('email').notNullable().unique();
      table.string('city');
      table.string('state');
      table.string('country');
      table.string('photo_url').unique();
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('Customer');
};
