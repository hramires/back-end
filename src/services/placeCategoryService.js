const { ValidationError } = require("sequelize");
const placeCategory = require("../models/placeCategory");

async function createPlaceCategory({ 
    category_id,
    place_id 
}) {
    let status, data;
    try {
      const newPlaceCategory = await placeCategory.create({ 
        category_id,
        place_id  
    });
      status = 201;
      data = newPlaceCategory;
    } catch (error) {
      if (error instanceof ValidationError) {
        status = 400;
        data = { message: error.errors[0].message };
      } else {
        status = 500;
        data = { message: "Server Error" };
      }
    }
  
    return { status, data };
}

module.exports = { createPlaceCategory }