const { nanoid } = require("nanoid");
const dbPool = require("../config/connection");

const getAllService = () => {
  const query = `SELECT * FROM services`;
  return dbPool.execute(query);
};

const addNewService = (body) => {
  const idUser = `services${nanoid(15)}`;
  const query = `INSERT INTO services (id, name, avatar, phone, lat, lon) VALUES ('${idUser}', '${body.name}', '${body.avatar}', '${body.phone}', '${body.lat}', '${body.lon}')`;
  return dbPool.execute(query);
};

const findService = (name) => {
  const query = `SELECT * FROM services WHERE name LIKE '%${name}%'`;
  return dbPool.execute(query);
};

module.exports = { addNewService, getAllService, findService };
