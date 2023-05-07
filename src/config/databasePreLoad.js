// Importing Models
const Category = require("../models/category");
const Roadmap = require("../models/roadmap");
const Photo = require("../models/photo");
const Region = require("../models/region");
const Event = require("../models/event");
const PlaceCategory = require("../models/placeCategory");
const Place = require("../models/place");
const RoadmapPlace = require("../models/roadmapPlace");
const cleanDatabase = require("../utils/cleanDatabase");

// Preload User data into the database

async function preloadData() {
  try {
    const categoryData = [
      {
        id: 1,
        name: "Cervejarias",
      },
    ];

    const photoData = [
      {
        id: 1,
        photo_url: "photoUrl",
        description: "Foto do lugar que vamos ",
      },
    ];
    const regionData = [
      {
        id: 1,
        city: "Caxias do Sul",
        description:
          "Grande do Sul com maior número de habitantes, Caxias do Sul está no ranking dos 100 melhores municípios brasileiros para se viver, sendo a primeira cidade gaúcha a liderar essa lista.",
      },
    ];

    const placeData = [
      {
        id: 1,
        region_id: 1,
        name: "Casa da Edição",
        openingHour: "08:00",
        contact: "+5551998231918",
        latitude: "55",
        longitude: "11",
        description: "Casa da edição nova",
        appointment: false,
      },
    ];

    const placeCategoryData = [
      {
        id: 1,
        category_id: 1,
        place_id: 1,
      },
    ];

    const roadmapData = [
      {
        id: 1,
        name: "Esse só tem um local de visitação",
        description: "Segue reto, primeira e unica parada é lá",
      },
    ];

    const roadmapPlaceData = [
      {
        id: 1,
        roadmap_id: 1,
        place_id: 1,
        order: 1,
      },
    ];

    const eventData = [
      {
        id: 1,
        place_id: 1,
        name: "SHOW PEDRO SAMPAIO - CAXIAS DO SUL",
        description: "Aqui é festa =)",
        startDate: new Date("2023-03-25").toISOString(),
        endDate: new Date("2023-03-30").toISOString(),
        openingHour: "22:00",
      },
    ];

    // Cleaning data
    await cleanDatabase();

    await Category.bulkCreate(categoryData);
    await Region.bulkCreate(regionData);
    await Photo.bulkCreate(photoData);
    await Place.bulkCreate(placeData);
    await PlaceCategory.bulkCreate(placeCategoryData);
    await Event.bulkCreate(eventData);
    await Roadmap.bulkCreate(roadmapData);
    await RoadmapPlace.bulkCreate(roadmapPlaceData);

    console.log("Data preloaded successfully!");
  } catch (error) {
    console.error(error);
  }
}

module.exports = preloadData;
