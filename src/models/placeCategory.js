const { DataTypes } = require("sequelize");
const db = require("../config/database");

const PlaceCategory = db.define("PlaceCategory", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = PlaceCategory;
