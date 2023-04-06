const { TimeoutError, ValidationError } = require("sequelize");
const Place = require("../models/place");

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
    appointment,
  } = req.body;
  let { status, data } = await updateById(placeId, {
    region_id,
    placeCategory_id,
    photo_id,
    name,
    openingHour,
    appointment,
  });
  res.status(status).json(data);
}

async function deletePlace(req, res) {
  const placeId = req.params.id;
  let { status, data } = await deleteById(placeId);
  res.status(status).json(data);
}

module.exports = { getAll, getById, updatePlace, deletePlace };
