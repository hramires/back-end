const { ValidationError } = require("sequelize");
const RoadmapPlace = require("../models/roadmapPlace");

async function createRoadmapPlace(roadmap_id, place_id, order) {
  let status, data;
  try {
    const newRoadmapPlace = await RoadmapPlace.create({
      roadmap_id,
      place_id,
      order,
    });
    status = 201;
    data = newRoadmapPlace;
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

async function getAllByRoadmapId(roadmap_id) {
  try {
    const roadmapPlace = await RoadmapPlace.findAll({
      where: { roadmap_id: roadmap_id },
    });
    const listPlacesId = [];
    roadmapPlace.forEach((element) => {
      listPlacesId.push(element.dataValues.place_id);
    });
    return {
      status: 200,
      data: { listPlacesId },
      message: "RoadmapPlaces retrieved successfully",
    };
  } catch (error) {
    console.error("Error getting RoadmapPlaces:", error);
    return { status: 500, data: { error: "Internal Server Error" } };
  }
}

async function updateRoadmapPlace(roadmap_id, place_ids) {
  try {
    const roadmapPlacesObj = await RoadmapPlace.findAll({
      where: { roadmap_id: roadmap_id },
    });
    roadmapPlaces = [];
    for (i = 0; i < roadmapPlacesObj.length; i++) {
      roadmapPlaces.push(roadmapPlacesObj[i].dataValues.place_id);
    }

    place_ids.forEach((place_id) => {
      if (!roadmapPlaces.includes(place_id)) {
        createRoadmapPlace(place_id, roadmap_id);
      }
    });

    roadmapPlaces.forEach((place_id) => {
      if (!place_ids.includes(place_id)) {
        removeRoadmapPlace(place_id, roadmap_id);
      }
    });
    return { status: 204, data: {} };
  } catch (error) {
    return {
      status: 500,
      data: { error: "Internal Server Error while handling places." },
    };
  }
}

module.exports = { createRoadmapPlace, getAllByRoadmapId, updateRoadmapPlace };
