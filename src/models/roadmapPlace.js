const { DataTypes } = require("sequelize");
const db = require("../config/database");

const PlaceRoadmap = db.define("PlaceRoadmap", {
  roadmap_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  place_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  order: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = PlaceRoadmap;
