const { DataTypes } = require("sequelize");
const db = require("../config/database");

const Place = db.define("Place", {
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
  region_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  photo_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  openingHour: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  contact: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  latitude: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  longitude: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  appointment: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

module.exports = Place;
