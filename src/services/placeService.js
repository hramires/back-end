const Place = require("../models/place");
const { errorHandler } = require("../middleware/errorHandler");

async function create(req, res, next) {
  try {
    const {
      name,
      region_id,
      placeCategory_id,
      photo_id,
      openingHour,
      contact,
      latitude,
      longitude,
      description,
      appointment,
    } = req.body;
    const place = await Place.create({
      name,
      region_id,
      placeCategory_id,
      photo_id,
      openingHour,
      contact,
      latitude,
      longitude,
      description,
      appointment,
    });
    //res.status(201).json({ place });
    return { status: 200, data: { place } };
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

async function getAll(req, res, next) {
  try {
    const places = await Place.findAll();
    return { status: 200, data: { places } };
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

async function getById(req, res, next) {
  try {
    const id = req.params.id;
    const place = await Place.findByPk(id);
    if (place) {
      return { status: 200, data: { place } };
    } else {
      return { status: 404, data: { place } };
    }
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

async function update(req, res, next) {
  try {
    const id = req.params.id;
    const place = await Place.findByPk(id);
    if (place) {
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
      await place.update({
        region_id: region_id || place.region_id,
        placeCategory_id: placeCategory_id || place.placeCategory_id,
        photo_id: photo_id || place.photo_id,
        name: name || place.name,
        openingHour: openingHour || place.photo_id,
        contact: contact || place.contact,
        latitude: latitude || place.latitude,
        longitude: longitude || place.longitude,
        description: description || place.description,
        appointment: appointment || place.appointment,
      });
      return { status: 200, data: { place } };
    } else {
      return { status: 404, data: { error: "Place not found" } };
    }
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    const place = await Place.findByPk(id);
    if (place) {
      await place.destroy();
      return { status: 204, data: {} };
    } else {
      return { status: 404, data: { error: "Place not found" } };
    }
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
