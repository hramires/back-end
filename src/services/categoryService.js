const { errorHandler } = require("../middleware/errorHandler");
const Category = require("../models/category");

async function create(req, res, next) {
  try {
    const { name } = req.body;
    if(name == ""){
      return { status: 400, data: { "error": "Nome da categoria não deve ser vazio." } };
    }
    if(name.length <=3){
      return { status: 400, data: { "error": "Nome da categoria deve possuir 4 ou mais caracteres." } };
    }
    const category = await Category.create({ name });
    return { status: 200, data: { category } };
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

async function getAll(req, res, next) {
  try {
    const categories = await Category.findAll();
    return { status: 200, data: { categories } };
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

async function getById(req, res, next) {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);
    if (category) {
      return { status: 200, data: { category } };
    } else {
      return { status: 404, data: { category } };
    }
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

async function update(req, res, next) {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);
    if (category) {
      const { name } = req.body;
      if(name == ""){
        return { status: 400, data: { "error": "Nome da categoria não deve ser vazio." } };
      }
      if(name.length <=3){
        return { status: 400, data: { "error": "Nome da categoria deve possuir 4 ou mais caracteres." } };
      }
      await category.update({ name: name });
      return { status: 200, data: { category } };
    } else {
      return { status: 404, data: { error: "Category not found" } };
    }
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    const category = await Category.findByPk(id);
    if (category) {
      await category.destroy();
      return { status: 204, data: {} };
    } else {
      return { status: 404, data: { error: "Category not found" } };
    }
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
