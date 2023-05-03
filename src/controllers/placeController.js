const Place = require("../models/place");
const { getById } = require("../services/placeService");
const { deletePlace } = require("../services/placeService");
const { getAll } = require("../services/placeService");
const { create } = require("../services/placeService");
const { createPlaceCategory } = require("../services/placeCategoryService");


async function createPlace(req, res) {
  const {
    region_id,
    photo_id,
    category_ids,
    name,
    openingHour,
    contact,
    latitude,
    longitude,
    description,
    appointment,
  } = req.body;
  let { status, data } = await create({
    region_id,
    photo_id,
    name,
    openingHour,
    contact,
    latitude,
    longitude,
    description,
    appointment,
  });

  let id_place = data.id;
  category_ids.array.forEach(async element => {
    try {
      createPlaceCategory(element, id_place);
    } catch (error) {
      deletePlace(id_place);
      status = 500;
      data = { message: "Server Error" };
    }
  });

const {
  create,
  getAll,
  getById,
  update,
  remove,
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

module.exports = {
  createPlace,
  getAllPlaces,
  getPlace,
  updatePlace,
  removePlace,
};
