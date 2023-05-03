const Place = require("../models/place");
const { getById } = require("../services/placeService");
const { deletePlace } = require("../services/placeService");
const { getAll } = require("../services/placeService");
const { create } = require("../services/placeService");
const { createPlaceCategory } = require("../services/placeCategoryService");

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

module.exports = {
  createPlace,
  getAllPlaces,
  getPlace,
  updatePlace,
  removePlace,
};
