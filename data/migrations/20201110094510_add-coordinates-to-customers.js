exports.up = (knex) => {
  return knex.schema.table('customers', function (table) {
    table.enu('coordinates', ['latitude', 'longitude']);
  });
};

exports.down = (knex) => {
  return knex.schema.table('customers', function (table) {
    table.dropColumn('coordinates');
  });
};
