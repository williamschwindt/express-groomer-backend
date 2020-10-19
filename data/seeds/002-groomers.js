const faker = require('faker');

const groomers = [...new Array(100)].map(() => ({
  photo_url: faker.image.avatar(),
  name: faker.name.firstName(),
  lastname: faker.name.lastName(),
  description: faker.lorem.paragraph(1),
  address: faker.address.streetAddress(),
  zip: faker.address.zipCode(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  city: faker.address.city(),
  state: faker.address.state(),
  country: faker.address.country(),
  walk_rate: faker.random.number(30000),
  day_care_rate: faker.random.number(30000),
  vet_visit_rate: faker.random.number(30000),
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('groomers')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('groomers').insert(groomers);
    });
};
