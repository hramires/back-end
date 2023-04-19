const { TimeoutError, ValidationError } = require("sequelize");
const User = require("../models/user");

const bcrypt = require("bcrypt");

async function getAll() {
  let status, data;
  try {
    status = 200;
    data = await User.findAll({
      order: [["id", "ASC"]],
    });
  } catch (error) {
    if (error instanceof TimeoutError) {
      status = 500;
      data = "Query execution time exceeded time limit";
    } else {
      status = 500;
      data = `Server Error`;
    }
  }

  return { status, data };
}

async function create({ email, password }) {
  const hashedPassword = await bcrypt.hash(password, 10);

  let status, data;
  try {
    const newUser = await User.create({ email, password: hashedPassword });
    status = 201;
    data = newUser;
  } catch (error) {
    if (error instanceof ValidationError) {
      status = 400;
      data = { message: error.errors[0].message };
    } else if (error.name === "SequelizeUniqueConstraintError") {
      status = 400;
      data = { message: "Email already exists" };
    } else {
      status = 500;
      data = { message: "Server Error" };
    }
  }

  return { status, data };
}

module.exports = { getAll, create };
