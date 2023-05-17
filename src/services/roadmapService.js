const Roadmap = require("../models/roadmap");
const Place = require("../models/place");
const RoadmapPlace = require("../models/roadmapPlace");
const { createRoadmapPlace, getAllByRoadmapId } = require("../services/roadmapPlaceService");

async function create(req) {
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
        await createRoadmapPlace(roadmap.id, place_id, i);
      }
    } catch (error) {
      remove(roadmap.id);
      console.error("Error creating roadmap:", error);
      return { status: 500, data: { error: "Internal Server Error" } };
    }
    return {
      status: 201,
      data: { roadmap },
      message: "Roadmap created successfully",
    };
  } catch (error) {
    console.error("Error creating roadmap:", error);
    return { status: 500, data: { error: "Internal Server Error" } };
  }
}

async function getAll() {
  try {
    const roadmaps = await Roadmap.findAll();
    return {
      status: 200,
      data: { roadmaps },
      message: "Roadmaps retrieved successfully",
    };
  } catch (error) {
    console.error("Error getting roadmaps:", error);
    return { status: 500, data: { error: error.message } };
  }
}

async function getById(req, res, next) {
  try {
    const id = req;
    const roadmap = await Roadmap.findByPk(id);
    const places = (await getAllByRoadmapId(roadmap.id)).data;
    const placesObj = [];

    for( i = 0; i < places.listPlacesId.length; i++){
      placesObj.push(await Place.findByPk(places.listPlacesId[i]));
    }

    if (roadmap) {
      return { status: 200, data: {
        roadmap,
        'places': placesObj
      } };
    } else {
      return { status: 404, data: {
        roadmap,
        'places': placesObj
      } };
    }
  } catch (error) {
    console.error("Error creating roadmap:", error);
    return { status: 500, data: { error: "Internal Server Error" } };
  }
}

module.exports = { getAll, getById, create };