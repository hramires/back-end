// Importing Models
const User = require("../models/user");
const Roadmap = require("../models/roadmap");
const Region = require("../models/region");
const Event = require("../models/event");
const EnterpriseCategory = require("../models/enterpriseCategory");
const Enterprise = require("../models/enterprise");

// Preload User data into the database
async function preloadData() {
  try {
    const enterpriseCategoryData = [
      {
        name: "Cervejarias",
      },
    ];

    const userData = [{ email: "johndoe@email.com" }];

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

    const enterpriseData = [
      {
        region_id: 1,
        enterpriseCategory_id: 1,
        enterprise_name: "Bies Haus Bar",
        photos: null,
        opening_hour: "08:00",
        appointment: "Isso é um appointment",
      },
    ];

    const roadmapData = [
      {
        enterprise_id: 1,
        region_id: 1,
        roadmap_name: "",
        roadmap: "{map}",
        description: "Segue reto",
      },
    ];

    await User.bulkCreate(userData);
    await Region.bulkCreate(regionData);
    await EnterpriseCategory.bulkCreate(enterpriseCategoryData);
    await Enterprise.bulkCreate(enterpriseData);
    await Roadmap.bulkCreate(roadmapData);
    await Event.bulkCreate(eventData);

    console.log("User data preloaded successfully!");
  } catch (error) {
    console.error(error);
  }
}

module.exports = preloadData;
