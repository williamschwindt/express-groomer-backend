exports.seed = function (knex) {
  // Deletes ALL existing entries
  return knex('Pet')
    .del()
    .then(function () {
      // Inserts seed entries
      return knex('Pet').insert([
        {
          id: 1,
          name: 'Ray',
          description: 'Very well educated Bordiercollie yadda yadda',
          photo_url: 'https://amazonstorageurl.com/ray',
        },
        {
          id: 2,
          name: 'Tony',
          description: 'Very playful West Highland White Terrier yadda yadda',
          photo_url: 'https://amazonstorageurl.com/tony',
        },
      ]);
    });
};
