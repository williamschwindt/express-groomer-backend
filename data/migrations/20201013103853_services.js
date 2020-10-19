exports.up = (knex) => {
  return knex.schema.createTable('services', function (table) {
    table.integer('id').increments();
    table.string('name', 128);
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('services');
};
