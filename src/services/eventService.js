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

module.exports = { create };
