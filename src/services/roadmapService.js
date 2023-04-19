const { TimeoutError, ValidationError } = require("sequelize");
const Roadmap = require("../models/roadmap");

async function create({
    name,
    roadmapPlace_id,
    description
}) {
    let status, data;
    try {
        const newRoadmap = await Roadmap.create({
            name,
            roadmapPlace_id,
            description,
        }); 
        status = 201
        data = newRoadmap;
    } catch (error) {
        if (error instanceof ValidationError) {
            status = 400;
            data = { messege: error.errors[0].messege}
        } else {
            status = 500;
            data = { messege: "Server error" };
        }
    }
    return { status, data };
}

async function getAll() {
    let status, data;
    try {
        status = 200;
        data = await Roadmap.findAll({
            order: [["id", "ASC"]],
        });
    } catch (error) {
        if (error instanceof TimeoutError) {
            status = 500;
            data = "Query execution time exceeded time limit";
        } else {
            status = 500;
            data = `Server Error`
        }
    }

    return { status, data };
}

async function getById(id) {
    let status, data;
    try {
        const roadmap = await Roadmap.findByPk(id);
        if (!roadmap) {
            status = 404;
            data = { message: "Place not found" };
        } else {
            status = 200;
            data = roadmap;
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

module.exports = { create, getAll, getById }; 