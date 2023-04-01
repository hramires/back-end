// Importing Models
const User = require("../models/user");
const Roadmap = require("../models/roadmap");
const Region = require("../models/region");
const Event = require("../models/event");
const PlaceCategory = require("../models/placeCategory");
const Place = require("../models/place");

// Preload User data into the database
async function preloadData() {
  try {
    const placeCategoryData = [
      {
        name: "Cervejarias",
      },
    ];

    const userData = [{ email: "Jorge@email.com", password: "jorge123" }];

    const eventData = [
      {
        region_id: 1,
        event_name: "SHOW PEDRO SAMPAIO - CAXIAS DO SUL",
        event_description: "Aqui é festa =)",
        event_date: new Date("2023-03-30").toISOString(),
        time: "22:00",
        location:
          "Pavilhões da Festa da Uva. R. Ludovíco Cavinato, 1431 - Nossa Sra. da Saúde, Caxias do Sul - RS",
        photo: null,
      },
    ];

    const regionData = [
      {
        city: "Caxias do Sul",
        description:
          "Grande do Sul com maior número de habitantes, Caxias do Sul está no ranking dos 100 melhores municípios brasileiros para se viver, sendo a primeira cidade gaúcha a liderar essa lista.",
        photo: null,
      },
    ];

    const placeData = [
      {
        region_id: 1,
        placeCategory_id: 1,
        place_name: "Bies Haus Bar",
        photos: null,
        opening_hour: "08:00",
        appointment: "Isso é um appointment",
      },
    ];

    const roadmapData = [
      {
        place_id: 1,
        region_id: 1,
        roadmap_name: "",
        roadmap: "{map}",
        description: "Segue reto",
      },
    ];

    await User.bulkCreate(userData);
    await Region.bulkCreate(regionData);
    await PlaceCategory.bulkCreate(placeCategoryData);
    await Place.bulkCreate(placeData);
    await Roadmap.bulkCreate(roadmapData);
    await Event.bulkCreate(eventData);

    console.log("User data preloaded successfully!");
  } catch (error) {
    console.error(error);
  }
}

module.exports = preloadData;
