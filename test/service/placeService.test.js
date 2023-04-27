const Place = require("../../src/models/place");
const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../../src/services/placeService");

jest.mock("../../src/models/place");

afterEach(() => {
  jest.restoreAllMocks();
});
describe("placeService", () => {
  describe("create function", () => {
    it("should create a new place successfully", async () => {
      const mockPlace = {
        name: "Test Place",
        region_id: 1,
        placeCategory_id: 1,
        photo_id: null,
        openingHour: null,
        contact: null,
        latitude: null,
        longitude: null,
        description: null,
        appointment: null,
      };
      const mockCreatedPlace = {
        _id: "610f4c4a04607d00447ceecd",
        ...mockPlace,
      };
      const mockCreate = jest
        .spyOn(Place, "create")
        .mockResolvedValue(mockCreatedPlace);

      const req = { body: mockPlace };
      const res = {};
      const next = jest.fn();
      const result = await create(req, res, next);

      expect(result.status).toBe(201);
      expect(result.data.place).toEqual(mockCreatedPlace);
      expect(result.data.place).toBeTruthy();
    });

    it("should handle errors when creating a new place", async () => {
      const mockCreate = jest
        .spyOn(Place, "create")
        .mockRejectedValue(new Error("Test error"));

      const req = { body: {} };
      const res = {};
      const next = jest.fn();
      const result = await create(req, res, next);

      expect(result.data.place).toBeUndefined();
      expect(result.status).toBe(400);
    });
  });

  describe("getAll function", () => {
    afterEach(() => {
      jest.restoreAllMocks();
    });

    it("should return all places successfully", async () => {
      const mockPlaces = [
        {
          id: 1,
          name: "Test Place 1",
          region_id: 1,
          placeCategory_id: 1,
          photo_id: null,
          openingHour: null,
          contact: null,
          latitude: null,
          longitude: null,
          description: null,
          appointment: null,
        },
        {
          id: 2,
          name: "Test Place 2",
          region_id: 2,
          placeCategory_id: 1,
          photo_id: null,
          openingHour: null,
          contact: null,
          latitude: null,
          longitude: null,
          description: null,
          appointment: null,
        },
      ];
      const mockFindAll = jest
        .spyOn(Place, "findAll")
        .mockResolvedValue(mockPlaces);

      const req = {};
      const res = { json: jest.fn() };
      const next = jest.fn();

      const result = await getAll(req, res, next);

      expect(mockFindAll).toHaveBeenCalled();
      // expect(result).toEqual({
      //   status: 200,
      //   data: { mockPlaces },
      // });
      expect(next).not.toHaveBeenCalled();
    });

    it("should handle errors when getting all places", async () => {
      const mockFindAll = jest
        .spyOn(Place, "findAll")
        .mockRejectedValue(new Error("UnknownError"));

      const req = {};
      const res = {};
      const next = jest.fn();

      await getAll(req, res, next);

      expect(mockFindAll).toHaveBeenCalled();
    });
  });

  describe("remove function", () => {
    let req, res, next;

    beforeEach(() => {
      req = {
        params: {
          id: 1,
        },
      };
      res = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn(),
      };
      next = jest.fn();
    });

    afterEach(() => {
      jest.clearAllMocks();
    });

    test("should return 404 if place not found", async () => {
      Place.findByPk = jest.fn().mockReturnValue(null);

      const result = await remove(req, res, next);

      expect(result).toEqual({
        status: 404,
        data: { error: "Place not found" },
      });
      expect(Place.findByPk).toHaveBeenCalledTimes(1);
      expect(Place.findByPk).toHaveBeenCalledWith(req.params.id);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
      expect(next).not.toHaveBeenCalled();
    });

    test("should delete the place and return 204", async () => {
      const place = { id: 1, name: "Test Place" };
      Place.findByPk = jest.fn().mockReturnValue(place);
      place.destroy = jest.fn();

      const result = await remove(req, res, next);

      expect(Place.findByPk).toHaveBeenCalledTimes(1);
      expect(Place.findByPk).toHaveBeenCalledWith(req.params.id);
      expect(place.destroy).toHaveBeenCalledTimes(1);
      expect(next).not.toHaveBeenCalled();
    });

    test("should return 500 if an error occurs", async () => {
      const error = new Error("Internal Server Error");
      Place.findByPk = jest.fn().mockRejectedValue(error);

      const result = await remove(req, res, next);

      expect(result).toEqual({
        status: 500,
        data: { error: "Internal Server Error" },
      });

      expect(Place.findByPk).toHaveBeenCalledTimes(1);
      expect(Place.findByPk).toHaveBeenCalledWith(req.params.id);
      expect(res.status).not.toHaveBeenCalled();
      expect(res.send).not.toHaveBeenCalled();
    });
  });
  describe("getById function", () => {
    it("should return a place with the given id", async () => {
      const mockPlace = {
        _id: "610f4c4a04607d00447ceecd",
        name: "Test Place",
        region_id: 1,
        placeCategory_id: 1,
        photo_id: null,
        openingHour: null,
        contact: null,
        latitude: null,
        longitude: null,
        description: null,
        appointment: null,
      };
      const mockFindById = jest
        .spyOn(Place, "findByPk")
        .mockResolvedValue(mockPlace);

      const req = { params: { id: mockPlace._id } };
      const res = {};
      const next = jest.fn();
      const result = await getById(req, res, next);

      expect(result.status).toBe(200);
      expect(result.data.place).toEqual(mockPlace);
      expect(result.data.place).toBeTruthy();
    });

    it("should handle errors when getting a place by id", async () => {
      // const mockFindById = jest
      //   .spyOn(Place, "findById")
      //   .mockRejectedValue(new Error("Test error"));

      const req = { params: { id: "invalid_id" } };
      const res = {};
      const next = jest.fn();
      const result = await getById(req, res, next);

      expect(result.data.place).toBeUndefined();
      expect(result.status).toBe(404);
      //expect(next).toHaveBeenCalledWith(new
    });
  });
});
