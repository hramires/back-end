const { TimeoutError, ValidationError } = require("sequelize");
const Event = require("../models/event");

async function create({ place_id, name, description, date, time, location }) {
  let status, data;
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

module.exports = { create, getById, getAll };
