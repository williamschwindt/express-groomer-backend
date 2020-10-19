exports.up = (knex) => {
  return knex.schema.createTable('groomers', function (table) {
    table.integer('id').notNullable().unique().primary();
    table.string('oktaId');
    table.string('name', 128).notNullable();
    table.text('description');
    table.string('lastname', 128).notNullable();
    table.string('address', 128).notNullable();
    table.string('zip', 128);
    table.string('phone', 128).notNullable().unique();
    table.string('email', 128).notNullable().unique();
    table.string('city', 128);
    table.string('state', 128);
    table.string('country', 128);
    table.string('photo_url');
    table.integer('walk_rate').unsigned();
    table.integer('day_care_rate').unsigned();
    table.integer('vet_visit_rate').unsigned();
    table.timestamps(true, true);
  });
};

exports.down = (knex) => {
  return knex.schema.dropTableIfExists('groomers');
};
