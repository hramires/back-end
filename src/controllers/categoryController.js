const Category = require("../models/category");
const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../services/categoryService");

async function getAllCategories(req, res, next) {
  let { status, data } = await getAll();
  res.status(status).json(data);
}

async function createCategory(req, res, next) {
  let { status, data } = await create(req, res, next);
  res.status(status).json(data);
}

async function getCategory(req, res, next) {
  let { status, data } = await getById(req, res, next);
  res.status(status).json(data);
}

async function updateCategory(req, res, next) {
  let { status, data } = await update(req, res, next);
  res.status(status).json(data);
}

async function removeCategory(req, res, next) {
  let { status, data } = await remove(req, res, next);
  res.status(status).json(data);
}

module.exports = {
  createCategory,
  getAllCategories,
  getCategory,
  updateCategory,
  removeCategory,
};
