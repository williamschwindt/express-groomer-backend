exports.up = (knex) => {
  return knex.schema.createTable('services', function (table) {
    table.increments('id');
    table.string('name', 128);
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('services');
};
