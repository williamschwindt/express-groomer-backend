exports.up = async function (knex) {
  await knex.schema.createTable('users', (table) => {
    table.increments('id');
    table.text('name').notNull();
    table.text('lastname').notNull();
    table.text('description');
    table.text('phone').unique().notNull();
    table.text('email').unique().notNull();
    table.text('photo_url');
  });

  await knex.schema.createTable('countries', (table) => {
    table.increments('id');
    table.text('name');
  });

  await knex.schema.createTable('states', (table) => {
    table.increments('id');
    table.text('name');
    table
      .integer('country_id')
      .references('id')
      .inTable('countries')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

  await knex.schema.createTable('cities', (table) => {
    table.increments('id');
    table.text('name');
    table
      .integer('state_id')
      .references('id')
      .inTable('states')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

  await knex.schema.createTable('addresses', (table) => {
    table.increments('id');
    table.text('street').notNull();
    table.text('zip');
    table.text('latitude');
    table.text('longitude');
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer('city_id')
      .references('id')
      .inTable('cities')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

  await knex.schema.createTable('pets', (table) => {
    table.increments('id');
    table.text('name');
    table.text('type');
    table
      .integer('user_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
  });

  await knex.schema.createTable('services', (table) => {
    table.increments('id');
    table.text('name');
  });

  await knex.schema.createTable('groomer_services', (table) => {
    table.increments('id');
    table
      .integer('groomer_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer('service_id')
      .references('id')
      .inTable('services')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.integer('price');
  });

  await knex.schema.createTable('appointments', (table) => {
    table.increments('id');
    table
      .integer('customer_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer('groomer_id')
      .references('id')
      .inTable('users')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer('pet_id')
      .references('id')
      .inTable('pets')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer('groomer_service_id')
      .references('id')
      .inTable('groomer_services')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table
      .integer('address_id')
      .references('id')
      .inTable('addresses')
      .onDelete('CASCADE')
      .onUpdate('CASCADE');
    table.text('date');
    table.text('start_time');
    table.text('end_time');
    table.text('notes');
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTableIfExists('appointments');
  await knex.schema.dropTableIfExists('groomer_services');
  await knex.schema.dropTableIfExists('services');
  await knex.schema.dropTableIfExists('pets');
  await knex.schema.dropTableIfExists('addresses');
  await knex.schema.dropTableIfExists('cities');
  await knex.schema.dropTableIfExists('states');
  await knex.schema.dropTableIfExists('countries');
  await knex.schema.dropTableIfExists('users');
};
