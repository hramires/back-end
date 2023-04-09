const Place = require("../models/place");
const { getById } = require("../services/placeService");
const { getAll } = require("../services/placeService");
const { create } = require("../services/placeService");

async function createPlace(req, res) {
  const {
    region_id,
    placeCategory_id,
    photo_id,
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
    placeCategory_id,
    photo_id,
    name,
    openingHour,
    contact,
    latitude,
    longitude,
    description,
    appointment,
  });
  res.status(status).json(data);
}

async function getAllPlaces(req, res) {
  let { status, data } = await getAll();
  res.status(status).json(data);
}

async function getPlace(req, res) {
  const placeId = req.params.id;
  let { status, data } = await getById(placeId);
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
    contact,
    latitude,
    longitude,
    description,
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
  place.contact = contact;
  place.latitude = latitude;
  place.longitude = longitude;
  place.description = description;
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
  createPlace,
  getAllPlaces,
  getPlace,
  updatePlace,
  removePlace,
};
