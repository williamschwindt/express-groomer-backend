const faker = require('faker');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('groomers_customers_services_pets')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('groomers_customers_services_pets').insert([
        {
          id: '1',
          customer_id: '2',
          pet_id: '1',
          groomer_id: '1',
          service_id: '2',
        },
        {
          id: '2',
          customer_id: '1',
          pet_id: '2',
          groomer_id: '2',
          service_id: '1',
        },
        {
          id: '3',
          customer_id: '1',
          pet_id: '3',
          groomer_id: '2',
          service_id: '1',
        },
      ]);
    });
};

// const faker = require('faker/locale/en_US');

// const faker = require('faker');

// const groomers_customers_services_pets = [...new Array(2)].map((i, idx) => ({
//   id: faker.random.number(),
//   customer_id: '2',
//   pet_id: '2',
//   groomer_id: '1',
//   service_id: '2',
// }));

// exports.seed = function (knex) {
//   // Deletes ALL existing entries
//   return knex('groomers_customers_services_pets')
//     .del()
//     .then(function () {
//       // Inserts seed entries
//       return knex('groomers_customers_services_pets').insert(
//         groomers_customers_services_pets
//       );
//     });
// };
