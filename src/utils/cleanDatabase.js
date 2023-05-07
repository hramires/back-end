const Category = require("../models/category");
const Roadmap = require("../models/roadmap");
const Photo = require("../models/photo");
const Region = require("../models/region");
const Event = require("../models/event");
const PlaceCategory = require("../models/placeCategory");
const Place = require("../models/place");
const RoadmapPlace = require("../models/roadmapPlace");
const db = require("../config/database");

async function cleanDatabase() {
  try {

    await PlaceCategory.destroy({ truncate: { cascade: true } });
    await RoadmapPlace.destroy({ truncate: { cascade: true } });
    await Category.destroy({ truncate: { cascade: true } });
    await Roadmap.destroy({ truncate: { cascade: true } });
    await Event.destroy({ truncate: { cascade: true } });
    await Place.destroy({ truncate: { cascade: true } });
    await Photo.destroy({ truncate: { cascade: true } });
    await Region.destroy({ truncate: { cascade: true } });

    console.log("Database cleaned successfully!");
  } catch (error) {
    console.error(error);
  }
}

module.exports = cleanDatabase;
