const db = require('../../data/db-config');

const findAll = async () => {
  return await db('customers').select('*');
};

const findBy = (filter) => {
  return db('customers').where(filter);
};

const findById = async (id) => {
  return db('customers').where({ id }).first().select('*');
};

const create = async (profile) => {
  return db('customers').insert(profile).returning('*');
};

const update = (id, profile) => {
  return db('customers')
    .where({ id: id })
    .first()
    .update(profile)
    .returning('*');
};

const remove = async (id) => {
  return await db('customers').where({ id }).del();
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
};
