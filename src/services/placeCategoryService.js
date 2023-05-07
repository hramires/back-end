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

async function updatePlaceCategory(place_id, category_ids) {
  try {
    // Updating tabela intermediária.
    // Busca todas linhas da tabela intermediária que tenham o ID do place a ser editado.
    const placeCategoriesObj = await PlaceCategory.findAll({
      where: { place_id: place_id },
    });
    // Pegando apenas os IDs das categorias da tabela intermediária
    placeCategories = [];
    for (i = 0; i < placeCategoriesObj.length; i++) {
      placeCategories.push(placeCategoriesObj[i].dataValues.category_id);
    }

    // Novos cadastros: se os IDs recebidos não estiverem na lista de já cadastrados, cadastra.
    category_ids.forEach((category_id) => {
      if (!placeCategories.includes(category_id)) {
        createPlaceCategory(category_id, place_id);
      }
    });

    // Deleção: se os IDs já cadastrados não estiver na lista recebida, deleta.
    placeCategories.forEach((category_id) => {
      if (!category_ids.includes(category_id)) {
        removePlaceCategory(category_id, place_id);
      }
    });
    return { status: 204, data: {} };
  } catch (error) {
    return {
      status: 500,
      data: { error: "Internal Server Error while handling categories." },
    };
  }
}

async function removePlaceCategory(category_id, place_id) {
  try {
    // Acha todos que têm place_id e category_id conforme passado.
    const placeCategory = await PlaceCategory.findAll({
      where: { category_id: category_id, place_id: place_id },
    });

    if (placeCategory.length == 0) {
      return { status: 404, data: { error: "Relation not found" } };
    }
    placeCategory.forEach((element) => {
      element.destroy();
    });
    return { status: 204, data: {} };
  } catch (error) {
    return { status: 500, data: { error: "Internal Server Error" } };
  }
}

async function getAllByPlaceId(place_id) {
  try {
    const placeCategories = await PlaceCategory.findAll({
      where: { place_id: place_id },
    });
    const listCategoriesId = [];
    placeCategories.forEach((element) => {
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
module.exports = { createPlaceCategory, getAllByPlaceId, updatePlaceCategory };
