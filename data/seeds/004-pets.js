const faker = require('faker');

const pets = [...new Array(100)].map((i, idx) => ({
  id: idx,
  name: faker.name.firstName(),
  description: faker.lorem.paragraph(1),
  photo_url: faker.image.avatar(),
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('pets')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('pets').insert(pets);
    });
};
