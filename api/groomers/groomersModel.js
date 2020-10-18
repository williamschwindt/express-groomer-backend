const db = require('../../data/db-config');

const findAll = async () => {
  return await db('Groomer');
};

const findBy = (filter) => {
  return db('Groomer').where(filter);
};

const findById = async (id) => {
  return db('Groomer').where({ id }).first().select('*');
};

const create = async (profile) => {
  return db('Groomer').insert(profile).returning('*');
};

const update = (id, profile) => {
  return db('Groomer').where({ id: id }).first().update(profile).returning('*');
};

const remove = async (id) => {
  return await db('Groomer').where({ id }).del();
};

const findOrCreateGroomer = async (groomerObj) => {
  const foundGroomer = await findById(groomerObj.id).then((groomer) => groomer);
  if (foundGroomer) {
    return foundGroomer;
  } else {
    return await create(groomerObj).then((newGroomer) => {
      return newGroomer ? newGroomer[0] : newGroomer;
    });
  }
};

module.exports = {
  findAll,
  findBy,
  findById,
  create,
  update,
  remove,
  findOrCreateGroomer,
};
