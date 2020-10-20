const faker = require('faker/locale/en_US');

const customers = [...new Array(100)].map(() => ({
  description: faker.lorem.paragraph(1),
  photo_url: faker.image.avatar(),
  name: faker.name.firstName(),
  lastname: faker.name.lastName(),
  address: faker.address.streetAddress(),
  zip: faker.address.zipCode(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  city: faker.address.city(),
  state: faker.address.state(),
  country: 'USA',
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('customers')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('customers').insert(customers);
    });
};
