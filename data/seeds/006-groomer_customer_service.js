exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('groomers_customers_services')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('groomers_customers_services').insert([
        {
          id: 1,
          customer_id: '2',
          pet_id: '2',
          groomer_id: '1',
          service_id: '2',
        },
        {
          id: 2,
          customer_id: '1',
          pet_id: '1',
          groomer_id: '2',
          service_id: '1',
        },
      ]);
    });
};
