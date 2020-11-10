exports.up = (knex) => {
  return knex.schema.table('groomers', function (table) {
    table.string('latitude', 128);
    table.string('longitude', 128);
  });
};

exports.down = (knex) => {
  return knex.schema.table('groomers', function (table) {
    table.dropColumn('latitude');
    table.dropColumn('longitude');
  });
};
