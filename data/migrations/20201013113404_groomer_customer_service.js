exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('groomer_customer_service', function (table) {
      table.string('id').notNullable().unique().primary();
      table.string('customer_id');
      table.string('pet_id');
      table.string('groomer_id');
      table.string('service_id');
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('groomer_customer_service');
};
