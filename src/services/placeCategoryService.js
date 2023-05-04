const { ValidationError } = require("sequelize");
const PlaceCategory = require("../models/placeCategory");

async function createPlaceCategory(category_id, place_id) {
  let status, data;
  try {
    const newPlaceCategory = await PlaceCategory.create({
      category_id,
      place_id,
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

async function getAllByPlaceId(place_id) {
  try {
    const placeCategories = await PlaceCategory.findAll({
      where: { place_id: place_id },
    });
    const listCategoriesId = [];
     placeCategories.forEach(element =>{
      listCategoriesId.push(element.dataValues.category_id);
    });
    return {
      status: 200,
      data: { listCategoriesId },
      message: "PlaceCategories retrieved successfully",
    };
  } catch (error) {
    console.error("Error getting PlaceCategories:", error);
    return { status: 500, data: { error: "Internal Server Error" } };
  }
}
module.exports = { createPlaceCategory, getAllByPlaceId };
