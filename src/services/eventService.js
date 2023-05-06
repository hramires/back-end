const { TimeoutError, ValidationError } = require("sequelize");
const Event = require("../models/event");

async function create({ place_id, name, description, date, time, location }) {
  let status, data;
  if (!name || !date || !time || !location) {
    return { status: 400, data: { error: "Missing required fields" } };
  }
  try {
    const newEvent = await Event.create({
      place_id,
      name,
      description,
      date,
      time,
      location,
    });
    status = 201;
    data = newEvent;
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

async function getById(id) {
  let status, data;
  try {
    const event = await Event.findByPk(id);
    if (!event) {
      status = 404;
      data = { message: "Event not found" };
    } else {
      status = 200;
      data = event;
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

async function getAll() {
  let status, data;
  try {
    status = 200;
    data = await Event.findAll({
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

async function update(req, res, next) {
  try {
    const id = req.params.id;
    const event = await Event.findByPk(id);
    if (event) {
      const { place_id, name, description, date, time, location } = req.body;
      await event.update({
        place_id: place_id || event.place_id,
        name: name || event.name,
        description: description || event.description,
        date: date || event.date,
        time: time || event.time,
        location: location || event.location,
      });
      return { status: 200, data: { event } };
    } else {
      return { status: 404, data: { error: "Place not found" } };
    }
  } catch (error) {
    // errorHandler(error, req, res, next);
    return { status: 500, data: { error: "Internal Server Error" } };
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    const event = await Event.findByPk(id);
    if (!event) {
      return { status: 404, data: { error: "Place not found" } };
    }
    await event.destroy();
    return { status: 204, data: {} };
  } catch (error) {
    return { status: 500, data: { error: "Internal Server Error" } };
  }
}

module.exports = { create, getById, getAll, update, remove };
