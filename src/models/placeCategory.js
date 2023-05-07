const { DataTypes } = require("sequelize");
const db = require("../config/database");

const PlaceCategory = db.define("PlaceCategory", {
  category_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  place_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

module.exports = PlaceCategory;
