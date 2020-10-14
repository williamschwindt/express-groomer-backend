exports.up = (knex) => {
  return knex.schema.createTable('groomer_customer_service', function (table) {
    table.integer('id').notNullable().unique().primary();
    table
      .integer('customer_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('Customer');
    table
      .integer('pet_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('Pet');
    table
      .integer('groomer_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('Groomer');
    table
      .integer('service_id')
      .unsigned()
      .notNullable()
      .references('id')
      .inTable('Service');

    table.primary(['customer_id', 'pet_id', 'groomer_id', 'service_id']);
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('groomer_customer_service');
};
