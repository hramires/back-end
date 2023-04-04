const Place = require("../models/place");
const { getAll, create, getById } = require("../services/placeService");

async function getAllPlaces(req, res) {
  let { status, data } = await getAll();
  res.status(status).json(data);
}

async function getPlace(req, res) {
  const placeId = req.params.id;
  let { status, data } = await getById(placeId);
  res.status(status).json(data);
}

async function createPlace(req, res) {
  const {
    region_id,
    placeCategory_id,
    photo_id,
    name,
    openingHour,
    appointment,
  } = req.body;
  let { status, data } = await create({
    region_id,
    placeCategory_id,
    photo_id,
    name,
    openingHour,
    appointment,
  });
  res.status(status).json(data);
}

async function updatePlace(req, res) {
  const placeId = req.params.id;
  const {
    region_id,
    placeCategory_id,
    photo_id,
    name,
    openingHour,
    appointment,
  } = req.body;
  let place = await Place.findByPk(placeId);
  if (!place) {
    const error = new Error("Could not find place.");
    error.statusCode = 404;
    throw error;
  }
  place.region_id = region_id;
  place.placeCategory_id = placeCategory_id;
  place.photo_id = photo_id;
  place.name = name;
  place.openingHour = openingHour;
  place.appointment = appointment;
  place = await place.save();
  res.status(200).json(place);
}

async function removePlace(req, res) {
  const placeId = req.params.id;
  const place = await Place.findByPk(placeId);
  if (!place) {
    const error = new Error("Could not find place.");
    error.statusCode = 404;
    throw error;
  }
  await place.destroy();
  res.status(204).send();
}

module.exports = {
  getAllPlaces,
  createPlace,
  getPlace,
  updatePlace,
  removePlace,
};
