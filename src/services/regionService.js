const Region = require("../models/region");

async function create(req, res, next) {
    try {
        const { 
            city, 
            description
        } = req.body;
        const region = await Region.create({ 
            city, 
            description 
        });
        return { status: 200, data: { region } };
    } catch (error) {
        return { status: 500, data: { error: "Internal Server Error" } };
    }
}

async function getAll(req, res, next) {
    try {
      const regions = await Region.findAll();
      return { status: 200, data: { regions } };
    } catch (error) {
      return { status: 500, data: { error: "Internal Server Error" } };
    }
}

async function getById(req, res, next) {
    try {
      const id = req.params.id;
      const region = await Region.findByPk(id);
      if (region) {
        return { status: 200, data: { region } };
      } else {
        return { status: 404, data: { region } };
      }
    } catch (error) {
      return { status: 500, data: { error: "Internal Server Error" } };
    }
}

async function update(req, res, next) {
  try {
    const id = req.params.id;
    const region = await Region.findByPk(id);
    if (region) {
      const { 
        city, 
        description 
      } = req.body;
      await region.update({ city : city, description : description });
      return { status: 200, data: { region } };
    } else {
      return { status: 404, data: { error: "Region not found" } };
    }
  } catch (error) {
    return { status: 500, data: { error: "Internal Server Error" } };
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    const region = await Region.findByPk(id);
    if (region) {
      await region.destroy();
      return { status: 204, data: {} };
    } else {
      return { status: 404, data: { error: "Region not found" } };
    }
  } catch (error) {
    return { status: 500, data: { error: "Internal Server Error" } };
  }
}

module.exports = { create, getAll, getById, update, remove };
