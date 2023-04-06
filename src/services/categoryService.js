const { TimeoutError, ValidationError } = require("sequelize");
const Category = require("../models/category");

async function getAll() {
  let status, data;
  try {
    status = 200;
    data = await Category.findAll({
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

async function create({ name }) {
  let status, data;
  try {
    const newCategory = await Category.create({ name });
    status = 201;
    data = newCategory;
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
