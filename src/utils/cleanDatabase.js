const Category = require("../models/category");
const Roadmap = require("../models/roadmap");
const Photo = require("../models/photo");
const Region = require("../models/region");
const Event = require("../models/event");
const PlaceCategory = require("../models/placeCategory");
const Place = require("../models/place");
const RoadmapPlace = require("../models/roadmapPlace");
const { sequelize } = require("sequelize");

async function cleanDatabase() {
  try {
    // DISABLE FOREIGN KEYS
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");

    await Category.destroy({ truncate: true });
    await Roadmap.destroy({ truncate: true });
    await Photo.destroy({ truncate: true });
    await Region.destroy({ truncate: true });
    await Event.destroy({ truncate: true });
    await PlaceCategory.destroy({ truncate: true });
    await Place.destroy({ truncate: true });
    await RoadmapPlace.destroy({ truncate: true });

    // ENABLE FOREIGN KEYS
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");
    console.log("Database cleaned successfully!");
  } catch (error) {
    console.error(error);
  }
}

module.exports = cleanDatabase;
