exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('groomer_customer_service')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('groomer_customer_service').insert([
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
