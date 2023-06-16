const dbPool = require("../config/connection");
const { nanoid } = require("nanoid");

const getAllUsers = () => {
  const query = "SELECT * FROM users";
  return dbPool.execute(query);
};

const addNewUser = (userData) => {
  const idUser = `${nanoid(15)}`;
  const { nik, name, email, phone, pass } = userData;
  const query = `INSERT INTO users (id, nik, name, email, phone, pass)
                  VALUES ('${idUser}', ?, ?, ?, ?, ?)`;
  return dbPool.execute(query, [nik, name, email, phone, pass]);
};

const updateUser = (body, idUser) => {
  const query = ` UPDATE users SET name = '${body.name}', email = '${body.email}', phone = '${body.phone}' WHERE '${idUser}'`;
  return dbPool.execute(query);
};

const findUser = (email) => {
  const query = `SELECT * FROM users WHERE email = ?`;
  return dbPool.execute(query, [email]);
};

module.exports = { getAllUsers, addNewUser, updateUser, findUser };
