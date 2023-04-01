const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Place = db.define("Place", {
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  region_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  placeCategory_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  place_name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  photos: {
    type: DataTypes.BLOB,
    allowNull: true,
  },
  opening_hour: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  appointment: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Place;
