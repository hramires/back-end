const Place = require("../models/place");
const {
  create,
  getAll,
  getById,
  update,
  remove,
  getAllByRegionId,
} = require("../services/placeService");

async function createPlace(req, res, next) {
  let { status, data } = await create(req, res, next);
  res.status(status).json(data);
}

async function getAllPlaces(req, res, next) {
  let { status, data } = await getAll(req, res, next);
  res.status(status).json(data);
}

async function getPlace(req, res, next) {
  let { status, data } = await getById(req, res, next);
  res.status(status).json(data);
}

async function updatePlace(req, res, next) {
  let { status, data } = await update(req, res, next);
  res.status(status).json(data);
}

async function removePlace(req, res, next) {
  let { status, data } = await remove(req, res, next);
  res.status(status).send();
}

async function getAllByRegionIdPlace(req, res, next) {
  let { status, data } = await getAllByRegionId(req, res, next);
  res.status(status).json(data);
}

module.exports = {
  createPlace,
  getAllPlaces,
  getPlace,
  updatePlace,
  removePlace,
  getAllByRegionIdPlace,
};
