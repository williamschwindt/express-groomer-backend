exports.up = (knex) => {
  return knex.schema.table('groomers', function (table) {
    table.enu('coordinates', ['latitude', 'longitude']);
  });
};

exports.down = (knex) => {
  return knex.schema.table('groomers', function (table) {
    table.dropColumn('coordinates');
  });
};
