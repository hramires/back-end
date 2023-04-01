const Place = require("../models/place");
const PlaceCategory = require("../models/placeCategory");
const Event = require("../models/event");
const Region = require("../models/region");
const Roadmap = require("../models/roadmap");

const associations = () => {
  PlaceCategory.hasMany(Place, {
    foreignKey: "placeCategory_id",
  });
  Place.belongsTo(PlaceCategory, {
    foreignKey: "placeCategory_id",
  });

  Place.hasMany(Event, { foreignKey: "place_id" });
  Event.belongsTo(Place, { foreignKey: "place_id" });

  Region.hasMany(Place, { foreignKey: "region_id" });
  Place.belongsTo(Region, { foreignKey: "region_id" });

  Region.hasMany(Event, { foreignKey: "region_id" });
  Event.belongsTo(Region, { foreignKey: "region_id" });

  Place.hasMany(Roadmap, { foreignKey: "place_id" });
  Roadmap.belongsTo(Place, { foreignKey: "place_id" });

  Region.hasMany(Roadmap, { foreignKey: "region_id" });
  Roadmap.belongsTo(Region, { foreignKey: "region_id" });
};

module.exports = associations;
