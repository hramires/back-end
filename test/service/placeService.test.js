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
  // restore the spy created with spyOn
  jest.restoreAllMocks();
});
describe("placeService", () => {
  describe("create function", () => {
    it("should create a new place successfully", async () => {
      const mockCreate = jest.spyOn(Place, "create");
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
      mockCreate.mockResolvedValue(mockPlace);

      const req = { body: mockPlace };
      const res = {};
      const next = jest.fn();
      const result = await create(req, res, next);

      expect(mockCreate).toHaveBeenCalledWith(mockPlace);
      expect(result.status).toBe(201);
      expect(result.data.place).toEqual(mockPlace);
      expect(result.data.place).toBeTruthy();
    });

    it("should handle errors when creating a new place", async () => {
      const mockCreate = jest.fn();
      jest.mock("../../src/models/place", () => () => ({
        create: mockCreate,
      }));
      const error = new Error("Test error");
      mockCreate.mockRejectedValueOnce(error);
      const req = {
        body: {},
      };
      const res = {};
      const next = jest.fn();
      const result = await create(req, res, next);

      expect(result.data.place).toBeUndefined();
      expect(result.status).toBe(400);
    });
  });

  describe("getAll function", () => {
    it("should return all places successfully", async () => {
      const mockFindAll = jest.spyOn(Place, "findAll");
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
      mockFindAll.mockResolvedValue(mockPlaces);

      const req = {};
      const res = {};
      const next = jest.fn();
      const result = await getAll(req, res, next);

      expect(mockFindAll).toHaveBeenCalled();
      expect(result.status).toBe(200);
      expect(result.data.places).toEqual(mockPlaces);
    });

    it("should handle errors when getting all places", async () => {
      const mockFindAll = jest.spyOn(Place, "findAll");
      mockFindAll.mockImplementationOnce(() => {
        throw new Error("UnknownError");
      });
      const req = {};
      const res = {};
      const next = jest.fn();
      const result = await getAll(req, res, next);
      expect(mockFindAll).toHaveBeenCalled();
    });

    describe("getById function", () => {
      it("should return a place by id successfully", async () => {
        const mockFindById = jest.spyOn(Place, "findByPk");
        const mockPlace = {
          id: 1,
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
        mockFindById.mockResolvedValue(mockPlace);

        const req = { params: { id: 1 } };
        const res = {};
        const next = jest.fn();
        const result = await getById(req, res, next);

        expect(mockFindById).toHaveBeenCalledWith(req.params.id);
        expect(result.status).toBe(200);
        expect(result.data.place).toEqual(mockPlace);
      });

      it("should handle errors when getting a place by id", async () => {
        const mockFindById = jest.spyOn(Place, "findByPk");
        const req = {
          params: { id: 999 },
        };
        const res = {};
        const next = jest.fn();
        const result = await getById(req, res, next);

        expect(result.data.place).toBeUndefined();
        expect(result.status).toBe(404);
      });
    });

    describe("update", () => {
      test("should update a place", async () => {
        // Arrange
        const id = 1;
        const updatedPlace = { name: "New Place Name" };
        const place = { update: jest.fn().mockReturnValue(updatedPlace) };
        Place.findByPk.mockResolvedValue(place);
        const req = { params: { id }, body: updatedPlace };

        // Act
        const result = await update(req);

        // Assert
        expect(Place.findByPk).toHaveBeenCalledWith(id);
        expect(place.update).toHaveBeenCalledWith(updatedPlace);
        expect(result).toEqual({
          status: 200,
          data: { place: updatedPlace },
        });
      });

      test("should return a 404 error if the place doesn't exist", async () => {
        // Arrange
        const id = 1;
        Place.findByPk.mockResolvedValue(null);
        const req = { params: { id } };

        // Act
        const result = await update(req);

        // Assert
        expect(Place.findByPk).toHaveBeenCalledWith(id);
        expect(result).toEqual({
          status: 404,
          data: { error: "Place not found" },
        });
      });

      test("should return a 500 error if an error occurs", async () => {
        // Arrange
        const id = 1;
        const error = new Error("Internal Server Error");
        Place.findByPk.mockRejectedValue(error);
        const req = { params: { id } };

        // Act
        const result = await update(req);

        // Assert
        expect(Place.findByPk).toHaveBeenCalledWith(id);
        expect(result).toEqual({
          status: 500,
          data: { error: "Internal Server Error" },
        });
      });
    });

    describe("remove", () => {
      test("should remove a place", async () => {
        // Arrange
        const id = 1;
        const place = { destroy: jest.fn() };
        Place.findByPk.mockResolvedValue(place);
        const req = { params: { id } };

        // Act
        const result = await remove(req);

        // Assert
        expect(Place.findByPk).toHaveBeenCalledWith(id);
        expect(place.destroy).toHaveBeenCalled();
        expect(result).toEqual({ status: 204, data: {} });
      });

      test("should return a 404 error if the place doesn't exist", async () => {
        // Arrange
        const id = 1;
        Place.findByPk.mockResolvedValue(null);
        const req = { params: { id } };

        // Act
        const result = await remove(req);

        // Assert
        expect(Place.findByPk).toHaveBeenCalledWith(id);
        expect(result).toEqual({
          status: 404,
          data: { error: "Place not found" },
        });
      });

      test("should return a 500 error if an error occurs", async () => {
        // Arrange
        const id = 1;
        const error = new Error("Internal Server Error");
        Place.findByPk.mockRejectedValue(error);
        const req = { params: { id } };

        // Act
        const result = await remove(req);

        // Assert
        expect(Place.findByPk).toHaveBeenCalledWith(id);
        expect(result).toEqual({
          status: 500,
          data: { error: "Internal Server Error" },
        });
      });
    });
  });

  expect(Place.findByPk).toHaveBeenCalledWith(id);
  expect(place.update).toHaveBeenCalledWith(updatedPlace);
  expect(result).toEqual({ status: 200, data: { place: updatedPlace } });
});

test("should return a 404 error if the place doesn't exist", async () => {
  // Arrange
  const id = 1;
  Place.findByPk.mockResolvedValue(null);
  const req = { params: { id } };

  // Act
  const result = await update(req);

  // Assert
  expect(Place.findByPk).toHaveBeenCalledWith(id);
  expect(result).toEqual({
    status: 404,
    data: { error: "Place not found" },
  });
});

test("should return a 500 error if an error occurs", async () => {
  // Arrange
  const id = 1;
  const error = new Error("Internal Server Error");
  Place.findByPk.mockRejectedValue(error);
  const req = { params: { id } };

  // Act
  const result = await update(req);

  // Assert
  expect(Place.findByPk).toHaveBeenCalledWith(id);
  expect(result).toEqual({
    status: 500,
    data: { error: "Internal Server Error" },
  });
});

describe("remove", () => {
  test("should remove a place", async () => {
    // Arrange
    const id = 1;
    const place = { destroy: jest.fn() };
    Place.findByPk.mockResolvedValue(place);
    const req = { params: { id } };

    // Act
    const result = await remove(req);

    // Assert
    expect(Place.findByPk).toHaveBeenCalledWith(id);
    expect(place.destroy).toHaveBeenCalled();
    expect(result).toEqual({ status: 204, data: {} });
  });
});

//   test("should return a 404 error if the place doesn't exist", async () => {
//     // Arrange
//     const id = 1;
//     Place.findByPk.mockResolvedValue(null);
//     const req = { params: { id } };

//     // Act
//     const result = await remove(req);

//     // Assert
//     expect(Place.findByPk).toHaveBeenCalledWith(id);
//     expect(result).toEqual({
//       status: 404,
//       data: { error: "Place not found" },
//     });
//   });

//   test("should return a 500 error if an error occurs", async () => {
//     // Arrange
//     const id = 1;
//     const error = new Error("Internal Server Error");
//     Place.findByPk.mockRejectedValue(error);
//     const req = { params: { id } };

//     // Act
//     const result = await remove(req);

//     // Assert
//     expect(Place.findByPk).toHaveBeenCalledWith(id);
//     expect(result).toEqual({
//       status: 500,
//       data: { error: "Internal Server Error" },
//     });
//   });
// });

// test("should update a place", async () => {
//   // Arrange
//   const id = 1;
//   const updatedPlace = { name: "New Place Name" };
//   const place = { update: jest.fn().mockReturnValue(updatedPlace) };
//   Place.findByPk.mockResolvedValue(place);
//   const req = { params: { id }, body: updatedPlace };

//   // Act
//   const result = await update(req, {}, () => {});
//   jest.mock("../../src/models/place");
