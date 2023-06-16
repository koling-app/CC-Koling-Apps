const { nanoid } = require("nanoid");
const dbPool = require("../config/connection");

const getAllStory = () => {
  const query = "SELECT * FROM story";

  return dbPool.execute(query);
};

const addNewStory = (body) => {
  const idUser = `story${nanoid(15)}`;
  const query = `INSERT INTO story (id, name, description, photoUrl, lan, lon) VALUES ('${idUser}','${body.name}', '${body.description}', '${body.photoUrl}','${body.lan}', '${body.lon}')`;
  return dbPool.execute(query);
};

module.exports = { getAllStory, addNewStory };
