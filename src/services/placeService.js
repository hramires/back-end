const { TimeoutError, ValidationError } = require("sequelize");
const Place = require("../models/place");

async function create({
  region_id,
  photo_id,
  name,
  openingHour,
  contact,
  latitude,
  longitude,
  description,
  appointment,
}) {
  let status, data;
  try {
    const newPlace = await Place.create({
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
    status = 201;
    data = newPlace;
  } catch (error) {
    if (error instanceof ValidationError) {
      status = 400;
      data = { message: error.errors[0].message };
    } else {
      status = 500;
      data = { message: "Server Error" };
    }
  }

  

  return { status, data };
}

async function getAll() {
  let status, data;
  try {
    status = 200;
    data = await Place.findAll({
      order: [["id", "ASC"]],
    });
  } catch (error) {
    if (error instanceof TimeoutError) {
      status = 500;
      data = "Query execution time exceeded time limit";
    } else {
      status = 500;
      data = `Server Error`;
    }
  }
  return { status, data };
}

async function getById(id) {
  let status, data;
  try {
    const place = await Place.findByPk(id);
    if (!place) {
      status = 404;
      data = { message: "Place not found" };
    } else {
      status = 200;
      data = place;
    }
  } catch (error) {
    if (error instanceof TimeoutError) {
      status = 500;
      data = "Query execution time exceeded time limit";
    } else {
      status = 500;
      data = `Server Error`;
    }
  }
  return { status, data };
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
  let { status, data } = await updateById(placeId, {
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

async function deletePlace(req, res) {
  const placeId = req.params.id;
  let { status, data } = await deleteById(placeId);
  res.status(status).json(data);
}

module.exports = { create, getAll, getById, updatePlace, deletePlace };
