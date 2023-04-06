const Category = require("../models/category");
const { getAll, create } = require("../services/categoryService");

async function getAllCategories(req, res) {
  let { status, data } = await getAll();
  res.status(status).json(data);
}

async function createCategory(req, res) {
  const { name } = req.body;
  let { status, data } = await create({ name });
  res.status(status).json(data);
}

module.exports = { getAllCategories, createCategory };
