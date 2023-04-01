const User = require("../models/user");
const { getAll, create } = require("../services/userService");

async function getAllUsers(req, res) {
  let { status, data } = await getAll();
  res.status(status).json(data);
}

async function createUser(req, res) {
  const { email, password } = req.body;
  let { status, data } = await create({ email, password });
  res.status(status).json(data);
}

module.exports = { getAllUsers, createUser };
