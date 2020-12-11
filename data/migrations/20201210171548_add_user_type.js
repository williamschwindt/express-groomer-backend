exports.up = (knex) => {
  return knex.schema.table('users', async function (table) {
    await table.string('user_type');
  });
};

exports.down = (knex) => {
  return knex.schema.table('users', async function (table) {
    await table.dropColumn('user_type');
  });
};
