const faker = require('faker');

exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('groomers_customers_services_pets')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('groomers_customers_services_pets').insert();
    });
};
