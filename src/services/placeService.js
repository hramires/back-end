const Place = require("../models/place");
const PlaceCategory = require("../models/placeCategory");
//const { errorHandler } = require("../middleware/errorHandler");
const { where } = require("sequelize");
const {
  createPlaceCategory,
  getAllByPlaceId,
  updatePlaceCategory,
} = require("../services/placeCategoryService");
const Category = require("../models/category");

async function create(req, res, next) {
  try {
    const {
      name,
      region_id,
      photo_id,
      category_ids,
      openingHour,
      contact,
      latitude,
      longitude,
      description,
      appointment,
    } = req.body;

    if (!name || !region_id || !category_ids || category_ids.length === 0) {
      //se não tiver nome, região ou categoria (valor dentro do array de cateoria); funciona se vier um valor nulo ele deve retornar o erro
      return { status: 400, data: { error: "Missing required fields" } };
    }

    const place = await Place.create({
      name,
      region_id,
      photo_id,
      openingHour,
      contact,
      latitude,
      longitude,
      description,
      appointment,
    });
    try {
      for (let i = 0; i < category_ids.length; i++) {
        const category_id = category_ids[i];
        await createPlaceCategory(category_id, place.id);
      }
    } catch (error) {
      remove(place.id);
      console.error("Error creating place:", error);
      return { status: 500, data: { error: "Internal Server Error" } };
    }
    return {
      status: 201,
      data: { place },
      message: "Place created successfully",
    };
  } catch (error) {
    console.error("Error creating place:", error);
    return { status: 500, data: { error: "Internal Server Error" } };
  }
}

async function getAll(req, res, next) {
  try {
    const places = await Place.findAll();
    return {
      status: 200,
      data: { places },
      message: "Places retrieved successfully",
    };
  } catch (error) {
    console.error("Error getting places:", error);
    return { status: 500, data: { error: "Internal Server Error" } };
  }
}

async function getById(req, res, next) {
  try {
    const id = req.params.id;
    const place = await Place.findByPk(id);
    const categories = (await getAllByPlaceId(place.id)).data;
    const categoriesObj = [];

    for (i = 0; i < categories.listCategoriesId.length; i++) {
      categoriesObj.push(
        await Category.findByPk(categories.listCategoriesId[i])
      );
    }

    if (place) {
      return {
        status: 200,
        data: {
          place,
          categories: categoriesObj,
        },
      };
    } else {
      return {
        status: 404,
        data: {
          place,
          categories: categoriesObj,
        },
      };
    }
  } catch (error) {
    console.error("Error creating place:", error);
    return { status: 500, data: { error: "Internal Server Error" } };
  }
}

async function update(req, res, next) {
  try {
    const id = req.params.id;
    const place = await Place.findByPk(id);
    if (place) {
      const {
        region_id,
        photo_id,
        category_ids,
        name,
        openingHour,
        contact,
        latitude,
        longitude,
        description,
        appointment,
      } = req.body;

      let statusObj = await updatePlaceCategory(id, category_ids);
      if (statusObj.status == 500) {
        return {
          status: statusObj.status,
          data: { error: statusObj.data.error },
        };
      }

      await place.update({
        region_id: region_id || place.region_id,
        photo_id: photo_id || place.photo_id,
        name: name || place.name,
        openingHour: openingHour || place.openingHour,
        contact: contact || place.contact,
        latitude: latitude || place.latitude,
        longitude: longitude || place.longitude,
        description: description || place.description,
        appointment: appointment || place.appointment,
      });

      return { status: 200, data: { place } };
    } else {
      return { status: 404, data: { error: "Place not found" } };
    }
  } catch (error) {
    // errorHandler(error, req, res, next);
    return { status: 500, data: { error: "Internal Server Error" } };
  }
}

async function remove(req, res, next) {
  try {
    const id = req.params.id;
    const place = await Place.findByPk(id);
    if (!place) {
      return { status: 404, data: { error: "Place not found" } };
    }
    await place.destroy();
    return { status: 204, data: {} };
  } catch (error) {
    return { status: 500, data: { error: "Internal Server Error" } };
  }
}

module.exports = {
  create,
  getAll,
  getById,
  update,
  remove,
};
