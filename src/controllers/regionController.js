const Region = require("../models/region");
const { create, getAll, getById, update, remove } = require("../services/regionService");

async function createRegion(req, res, next) {
    let { status, data } = await create(req, res, next);
    res.status(status).json(data);
}

async function getAllRegions(req, res, next) {
    let { status, data } = await getAll();
    res.status(status).json(data);
}

async function getRegionById(req, res, next) {
    let { status, data } = await getById(req, res, next);
    res.status(status).json(data);
}

async function updateRegion(req, res, next) {
    let { status, data } = await update(req, res, next);
    res.status(status).json(data);
  }
  
  async function removeRegion(req, res, next) {
    let { status, data } = await remove(req, res, next);
    res.status(status).json(data);
  }

module.exports = { createRegion, getAllRegions, getRegionById, updateRegion, removeRegion };