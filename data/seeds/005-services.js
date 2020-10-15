const faker = require('faker');


exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('services')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('services').insert([
        {
          id: 1,
          name: 'walk',
        },
        {
          id: 2,
          name: 'daycare',
        },
        {
          id: 3,
          name: 'vetVisit',
        },
      ]);
    });
};
