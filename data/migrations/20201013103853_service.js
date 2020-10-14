exports.up = (knex) => {
  return knex.schema.createTable('Service', function (table) {
    table.integer('id').notNullable().unique().primary();
    table.string('name', 128);
    table.string('start_date', 128);
    table.string('end_date', 128);
    table.string('start_time', 128);
    table.string('end_time', 128);
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('Service');
};
