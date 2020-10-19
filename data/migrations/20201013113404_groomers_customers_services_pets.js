exports.up = (knex) => {
  return knex.schema.createTable('groomers_customers_services_pets', function (
    table
  ) {
    table.integer('id').increments();
    table.integer('customer_id').references('id').inTable('customers');
    table.integer('pet_id').references('id').inTable('pets');
    table.integer('groomer_id').references('id').inTable('groomers');
    table.integer('service_id').references('id').inTable('services');

    table.primary(['customer_id', 'pet_id', 'groomer_id', 'service_id']);
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('groomers_customers_services_pets');
};
