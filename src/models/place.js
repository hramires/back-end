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
  user_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  placeCategory_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  photo_id: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  opening_hour: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  appointment: {
    type: DataTypes.BOOLEAN,
    allowNull: true,
  },
});

module.exports = Place;
