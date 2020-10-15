exports.up = (knex) => {
  return (
    knex.schema
      // .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
      .createTable('services', function (table) {
        table.integer('id').notNullable().unique().primary();
        table.string('name', 128);
        table.timestamps(true, true);
      })
  );
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('services');
};
