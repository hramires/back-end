const Region = require("../models/region");
const { create, getAll, getById } = require("../services/regionService");

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

module.exports = { createRegion, getAllRegions, getRegionById };