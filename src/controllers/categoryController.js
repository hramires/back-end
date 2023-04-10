const Category = require("../models/category");
const { getAll, create, getById } = require("../services/categoryService");

async function getAllCategories(req, res) {
  let { status, data } = await getAll();
  res.status(status).json(data);
}

async function createCategory(req, res) {
  const { name } = req.body;
  let { status, data } = await create({ name });
  res.status(status).json(data);
}

async function getCategory(req, res) {
  const categoryId = req.params.id;
  let { status, data } = await getById(categoryId);
  res.status(status).json(data);
}

async function updateCategory(req, res) {
  const categoryId = req.params.id;
  const { name } = req.body;
  let category = await Category.findByPk(categoryId);
  if (!category) {
    const error = new Error("Could not find category.");
    error.statusCode = 404;
    throw error;
  }
  category.name = name;
  category = await category.save();
  res.status(200).json(category);
}

async function removeCategory(req, res) {
  const categoryId = req.params.id;
  const category = await Category.findByPk(categoryId);
  if (!category) {
    const error = new Error("Could not find category.");
    error.statusCode = 404;
    throw error;
  }
  await category.destroy();
  res.status(204).send();
}
module.exports = {
  getCategory,
  updateCategory,
  getAllCategories,
  createCategory,
  removeCategory,
};
