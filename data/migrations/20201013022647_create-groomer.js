exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('Groomer', function (table) {
      table.integer('id').notNullable().unique().primary();
      table.string('name', 128).notNullable();
      table.string('description', 128).notNullable();
      table.string('lastname', 128).notNullable();
      table.string('address', 128).notNullable();
      table.string('zip', 128);
      table.string('phone', 128).notNullable().unique();
      table.string('email', 128).notNullable().unique();
      table.string('city', 128);
      table.string('state', 128);
      table.string('country', 128);
      table.string('photo_url', 128).unique();
      table.integer('walk_rate').unsigned().notNullable();
      table.integer('day_care_rate').unsigned().notNullable();
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('Groomer');
};
