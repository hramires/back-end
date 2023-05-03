const { TimeoutError, ValidationError } = require("sequelize");
const Event = require("../models/event");
const { errorHandler } = require("../middleware/errorHandler");

async function create(req, res, next) {
  try {
    const { place_id, name, description, date, time, location } = req.body;

    if (!place_id || !name) {
      return { status: 400, data: { error: "Missing required fields" } };
    }

    const newEvent = await Event.create({
      place_id,
      name,
      description,
      date,
      time,
      location,
    });
    return {
      status: 201,
      data: { newEvent },
      message: "Event created successfully",
    };
  } catch (error) {
    console.error("Error creating event:", error);
    return { status: 500, data: { error: "Internal Server Error" } };
  }
}

async function getById(req, res, next) {
  try {
    const id = req.params.id;
    const event = Event.findByPk(id);
    if (event) {
      return { status: 200, data: { event } };
    } else {
      return { status: 404, data: { event } };
    }
  } catch (error) {
    return { status: 500, data: { error: "Internal Server Error" } };
  }
}

async function getAll(req, res, next) {
  try {
    const events = await Event.findAll();
    return {
      status: 200,
      data: { events },
      message: "Events retrieved successfully",
    };
  } catch (error) {
    console.error("Error getting events:", error);
    return { status: 500, data: { error: "Internal Server Error" } };
  }
}

module.exports = { create, getById, getAll };
