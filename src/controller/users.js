const UserModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const readAllUser = async (req, res) => {
  try {
    const [data] = await UserModel.getAllUsers();
    console.log(data);
    res.json({
      message: "Get All Users",
      data: data,
    });
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const createNewUser = async (req, res) => {
  const { nik, name, email, phone, pass } = req.body;
  const salt = 10;
  try {
    const hashPassword = await bcrypt.hash(pass, salt);
    const userData = { nik, name, email, phone, pass: hashPassword };
    await UserModel.addNewUser(userData);
    res.status(201).json({
      message: "Create New User Success",
      data: userData,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Server Error",
      serverMessage: error,
    });
  }
};

const editUser = async (req, res) => {
  const { idUser } = req.params;
  const { body } = req;
  try {
    await UserModel.updateUser(body, idUser);
    res.json({
      message: "Update User Success",
      id: idUser,
      data: body,
    });
  } catch (error) {
    res.status(500).json({
      error: "Server Error",
      serverMessage: error,
    });
  }
};

const loginUser = async (req, res) => {
  const { email, pass } = req.body;
  const SEKRET_KEY = process.env.SEKRET_KEY;
  try {
    const [rows] = await UserModel.findUser(email);
    if (rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    const user = rows[0];
    const isPasswordValid = await bcrypt.compare(pass, user.pass);
    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid Password" });
    }

    const token = jwt.sign({ userId: user.id }, SEKRET_KEY, {
      expiresIn: "1h",
    });

    res.status(200).json({
      message: "Login Succesfully",
      loginResult: {
        userid: user.id,
        name: user.name,
        email: user.email,
      },
      token: token,
    });
  } catch (error) {
    res.status({
      error: "Server error",
      messageError: error,
    });
  }
};

module.exports = { readAllUser, createNewUser, editUser, loginUser };
