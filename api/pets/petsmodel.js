const db = require('../../data/db-config');

function findPet() {
    return db('pets').select('id', 'name', 'description', 'photo_url');
}

function findAll() {
    return db('pets').select('*');
}

function findBy(filter) {
    return db("pets").where(filter);
}

function findById(id) {
    return db('pets').where({id}).first().select('*')
}

function create() {
    return db('pets').insert(pet).returning('*');
}

function update(){
    return db('pets').where({id:id}).first().update(profile).insert()
}
function remove(){
    return db('pets').where({id}).delete();
}

module.exports = {
    findAll,
    findBy,
    findById,
    create,
    update,
    remove,
    findPet,
  };