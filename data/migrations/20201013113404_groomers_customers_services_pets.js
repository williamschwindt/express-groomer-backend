exports.up = (knex) => {
  return knex.schema
    .raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp"')
    .createTable('groomers_customers_services_pets', function (table) {
      table.string('id').notNullable().unique();
      table.string('customer_id').references('id').inTable('customers');
      table.string('pet_id').notNullable().references('id').inTable('pets');
      table
        .string('groomer_id')
        .notNullable()
        .references('id')
        .inTable('groomers');
      table
        .string('service_id')
        .notNullable()
        .references('id')
        .inTable('services');

      table.primary(['customer_id', 'pet_id', 'groomer_id', 'service_id']);
      table.timestamps(true, true);
    });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('groomers_customers_services_pets');
};
