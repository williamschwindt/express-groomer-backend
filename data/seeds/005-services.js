exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('services')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('services').insert([
        {
          name: 'walk',
        },
        {
          name: 'daycare',
        },
        {
          name: 'vetVisit',
        },
      ]);
    });
};
