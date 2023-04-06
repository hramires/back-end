const Place = require("../models/place");
const PlaceCategory = require("../models/placeCategory");
const Event = require("../models/event");
const Region = require("../models/region");
const Roadmap = require("../models/roadmap");
const Category = require("../models/category");
const RoadmapPlace = require("../models/roadmapPlace");
const Photo = require("../models/photo");

const associations = () => {
  Place.belongsTo(Region, { foreignKey: "region_id" });
  Place.hasMany(PlaceCategory, { foreignKey: "place_id" });
  Place.hasMany(RoadmapPlace, { foreignKey: "place_id" });
  Place.hasMany(Event, { foreignKey: "place_id" });
  Place.hasOne(Photo, { foreignKey: "place_id" });
  PlaceCategory.belongsTo(Category, { foreignKey: "category_id" });
  PlaceCategory.belongsTo(Place, { foreignKey: "place_id" });
  Category.hasMany(PlaceCategory, { foreignKey: "category_id" });
  Roadmap.hasMany(RoadmapPlace, { foreignKey: "roadmap_id" });
  RoadmapPlace.belongsTo(Place, { foreignKey: "place_id" });
  RoadmapPlace.belongsTo(Roadmap, { foreignKey: "roadmap_id" });
  Photo.belongsTo(Place, { foreignKey: "place_id" });
  Region.hasMany(Place, { foreignKey: "region_id" });
  Event.belongsTo(Place, { foreignKey: "place_id" });
};

module.exports = associations;
