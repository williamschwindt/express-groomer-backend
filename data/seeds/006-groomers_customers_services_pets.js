const faker = require('faker/locale/en_US');

const groomers_customers_services_pets = [...new Array(100)].map(() => ({
  customer_id: faker.random.number(100).once,
  pet_id: faker.random.number(100).once,
  groomer_id: faker.random.number(100).once,
}));

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('groomers_customers_services_pets')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('groomers_customers_services_pets').insert(
        groomers_customers_services_pets
      );
    });
};
