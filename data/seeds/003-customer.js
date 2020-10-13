exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Customer')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('Customer').insert([
        {
          id: 1,
          name: 'John',
          lastname: 'Doe',
          address: '889 Thurmond St NW',
          zip: '30314',
          phone: '+1 404-230-9235',
          email: 'john@gmail.com',
          city: 'Atlanta',
          state: 'Georgia',
          country: 'USA',
        },
        {
          id: 2,
          name: 'Jane',
          lastname: 'Smith',
          address: '22 Thurmond St NW',
          zip: '30314',
          phone: '+1 404-250-3235',
          email: 'jane@cocos.com',
          city: 'Atlanta',
          state: 'Georgia',
          country: 'USA',
        },
      ]);
    });
};
