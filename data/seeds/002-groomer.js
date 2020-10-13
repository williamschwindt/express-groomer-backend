exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Groomer')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('Groomer').insert([
        {
          id: 1,
          name: 'Victor',
          lastname: 'Sandman',
          address: '66 Walton St NW',
          zip: '30303',
          phone: '+1 404-230-9235',
          email: 'vic@yahoo.com',
          city: 'Atlanta',
          state: 'Georgia',
          country: 'USA',
          walk_rate: '1000',
          day_care_rate: '10000',
        },
        {
          id: 2,
          name: 'Daniel',
          lastname: 'Fork',
          address: '2 Walton St NW',
          zip: '30303',
          phone: '+1 404-210-9232',
          email: 'dan@msn.com',
          city: 'Atlanta',
          state: 'Georgia',
          country: 'USA',
          walk_rate: '1200',
          day_care_rate: '10000',
        },
      ]);
    });
};
