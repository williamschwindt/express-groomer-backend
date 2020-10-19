exports.up = (knex) => {
  return knex.schema.createTable('pets', function (table) {
    table.integer('id').increments();
    table.text('description');
    table.string('name', 128);
    table.string('photo_url');
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('pets');
};
