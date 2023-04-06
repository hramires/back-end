// Importing Models
const User = require("../models/user");
const Category = require("../models/category");
const Roadmap = require("../models/roadmap");
const Photo = require("../models/photo");
const Region = require("../models/region");
const Event = require("../models/event");
const PlaceCategory = require("../models/placeCategory");
const Place = require("../models/place");
const PlaceRoadmap = require("../models/roadmapPlace");

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

    const userData = [{ email: "Jorge@email.com", password: "jorge123" }];

    const placeData = [
      {
        region_id: 1,
        placeCategory_id: 1,
        place_id: 1,
        opening_hour: "08:00",
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

    const placeRoadmapData = [
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
    await User.bulkCreate(userData);
    await Place.bulkCreate(placeData);
    await Photo.bulkCreate(photoData);
    await PlaceCategory.bulkCreate(placeCategoryData);
    await Roadmap.bulkCreate(roadmapData);
    await PlaceRoadmap.bulkCreate(placeRoadmapData);
    await Event.bulkCreate(eventData);

    console.log("User data preloaded successfully!");
  } catch (error) {
    console.error(error);
  }
}

module.exports = preloadData;
