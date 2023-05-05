const { TimeoutError } = require("sequelize");
const Roadmap = require("../models/roadmap");
const RoadmapPlace = require("../models/roadmapPlace");
const { createRoadmapPlace, getAllByRoadmapId } = require("../services/roadmapPlaceService");

async function create(req, res, next) {
  try {
    const {
      name,
      description,
      place_ids
    } = req.body;
  
    if (!name || !description || !place_ids || place_ids.length === 0) {
      return { status: 400, data: { error: "Missing required fields" } };
    }
  
    const roadmap = await Roadmap.create({
      name,
      description
    });
    try {
      for (let i = 0; i < place_ids.length; i++) {
        const place_id = place_ids[i];
        await createRoadmapPlace(place_id, roadmap.id);
      }
    } catch (error) {
      remove(roadmap.id);
      console.error("Error creating place:", error);
      return { status: 500, data: { error: "Internal Server Error" } };
    }
    return {
      status: 201,
      data: { roadmap },
      message: "Place created successfully",
    };
  } catch (error) {
    console.error("Error creating place:", error);
    return { status: 500, data: { error: "Internal Server Error" } };
  }
}

async function getById(id) {
    let status, data;
    try {
        const roadmap = await Roadmap.findByPk(id);
        if (!roadmap) {
            status = 404;
            data = { message: "Roadmap not found" };
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

module.exports = { getById, create };