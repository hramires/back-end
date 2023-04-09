// Importing Models
const Category = require("../models/category");
const Roadmap = require("../models/roadmap");
const Photo = require("../models/photo");
const Region = require("../models/region");
const Event = require("../models/event");
const PlaceCategory = require("../models/placeCategory");
const Place = require("../models/place");
const RoadmapPlace = require("../models/roadmapPlace");

// Preload User data into the database
async function preloadData() {
  try {
    const categoryData = [
      {
        name: "Cervejarias",
      },
    ];

    const placeCategoryData = [
      {
        category_id: 1,
        place_id: 1,
      },
    ];

    const photoData = [
      {
        photo_url: "photoUrl",
        description: "Foto do lugar que vamos ",
      },
    ];
    const regionData = [
      {
        city: "Caxias do Sul",
        description:
          "Grande do Sul com maior número de habitantes, Caxias do Sul está no ranking dos 100 melhores municípios brasileiros para se viver, sendo a primeira cidade gaúcha a liderar essa lista.",
      },
    ];

    const placeData = [
      {
        region_id: 1,
        placeCategory_id: 1,
        place_id: 1,
        name: "Casa da Edição",
        opening_hour: "08:00",
        contact: "+5551998231918",
        latitude: "55",
        longitude: "11",
        description: "Casa da edição nova",
        appointment: false,
      },
    ];

    const roadmapData = [
      {
        roadmapPlace_id: 1,
        name: "Esse só tem um local de visitação",
        description: "Segue reto, primeira e unica parada é lá",
      },
    ];

    const roadmapPlaceData = [
      {
        roadmap_id: 1,
        place_id: 1,
        order: 1,
      },
    ];

    const eventData = [
      {
        place_id: 1,
        name: "SHOW PEDRO SAMPAIO - CAXIAS DO SUL",
        description: "Aqui é festa =)",
        date: new Date("2023-03-30").toISOString(),
        time: "22:00",
        location:
          "Pavilhões da Festa da Uva. R. Ludovíco Cavinato, 1431 - Nossa Sra. da Saúde, Caxias do Sul - RS",
      },
    ];

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
