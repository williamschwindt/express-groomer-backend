const db = require('../../data/db-config');

const findAll = async () => {
  return await db('groomers');
};

const findBy = (filter) => {
  return db('groomers').where(filter);
};

const findById = async (id) => {
  return db('groomers').where({ id }).first().select('*');
};

const create = async (profile) => {
  return db('groomers').insert(profile).returning('*');
};

const update = (id, profile) => {
  return db('groomers')
    .where({ id: id })
    .first()
    .update(profile)
    .returning('*');
};

const remove = async (id) => {
  return await db('groomers').where({ id }).del();
};

const createGroomer = async (groomerObj) => {
  const [id] = await db('groomers').insert(groomerObj).returning('id');
  return await findById(id);
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
  createGroomer,
};
