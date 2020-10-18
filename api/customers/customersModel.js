const db = require('../../data/db-config');

const findAll = async () => {
  return await db('customers');
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

const findOrCreateCustomer = async (customerObj) => {
  const foundCustomer = await findById(customerObj.id).then(
    (customer) => customer
  );
  if (foundCustomer) {
    return foundCustomer;
  } else {
    return await create(customerObj).then((newCustomer) => {
      return newCustomer ? newCustomer[0] : newCustomer;
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
  findOrCreateCustomer,
};
