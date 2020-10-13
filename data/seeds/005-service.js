exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Service')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('Service').insert([
        {
          id: 1,
          name: 'walk',
          start_date: '',
          end_date: '',
          start_time: '',
          end_time: '',
        },
        {
          id: 2,
          name: 'daycare',
          start_date: '',
          end_date: '',
          start_time: '',
          end_time: '',
        },
      ]);
    });
};
