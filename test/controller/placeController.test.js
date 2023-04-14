const {
  createPlace,
  getAllPlaces,
  getPlace,
  updatePlace,
  removePlace,
} = require("../../src/controllers/placeController");

jest.mock("../../src/services/placeService", () => ({
  create: jest.fn(),
  getAll: jest.fn(),
  getById: jest.fn(),
  update: jest.fn(),
  remove: jest.fn(),
}));

describe("placeController", () => {
  describe("createPlace", () => {
    it("should call create function and return status and data", async () => {
      const req = { body: {} };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      const status = 201;
      const data = { name: "Place 1" };
      const createMock = require("../../src/services/placeService").create;
      createMock.mockResolvedValueOnce({ status, data });

      await createPlace(req, res, next);

      expect(createMock).toHaveBeenCalledWith(req, res, next);
      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith(data);
    });
  });

  describe("getAllPlaces", () => {
    it("should call getAll function and return status and data", async () => {
      const req = {};
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      const status = 200;
      const data = [{ name: "Place 1" }, { name: "Place 2" }];
      const getAllMock = require("../../src/services/placeService").getAll;
      getAllMock.mockResolvedValueOnce({ status, data });

      await getAllPlaces(req, res, next);

      expect(getAllMock).toHaveBeenCalledWith(req, res, next);
      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith(data);
    });
  });

  describe("getPlace", () => {
    it("should call getById function and return status and data", async () => {
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      const status = 200;
      const data = { name: "Place 1" };
      const getByIdMock = require("../../src/services/placeService").getById;
      getByIdMock.mockResolvedValueOnce({ status, data });

      await getPlace(req, res, next);

      expect(getByIdMock).toHaveBeenCalledWith(req, res, next);
      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith(data);
    });
  });

  describe("updatePlace", () => {
    it("should call update function and return status and data", async () => {
      const req = { params: { id: 1 }, body: { name: "New Place" } };
      const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      const next = jest.fn();
      const status = 200;
      const data = { name: "New Place" };
      const updateMock = require("../../src/services/placeService").update;
      updateMock.mockResolvedValueOnce({ status, data });

      await updatePlace(req, res, next);

      expect(updateMock).toHaveBeenCalledWith(req, res, next);
      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.json).toHaveBeenCalledWith(data);
    });
  });

  describe("removePlace", () => {
    it("should call remove function and return status 204 and send response", async () => {
      const req = { params: { id: 1 } };
      const res = { status: jest.fn().mockReturnThis(), send: jest.fn() };
      const next = jest.fn();
      const status = 204;
      const removeMock = require("../../src/services/placeService").remove;
      removeMock.mockResolvedValueOnce({ status });
      await removePlace(req, res, next);

      expect(removeMock).toHaveBeenCalledWith(req, res, next);
      expect(res.status).toHaveBeenCalledWith(status);
      expect(res.send).toHaveBeenCalled();
    });
  });
});
