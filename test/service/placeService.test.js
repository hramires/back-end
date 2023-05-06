const Place = require("../../src/models/place");
const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../../src/services/placeService");

jest.mock("../../src/models/place");

describe("placeService", () => {
  let mockPlace;
  let mockCreatedPlace;

  beforeAll(() => {
    mockPlace = {
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
    mockCreatedPlace = {
      _id: "610f4c4a04607d00447ceecd",
      ...mockPlace,
    };
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  describe("create function", () => {
    it("should return status 400 and an error message if required fields are missing", async () => {
      // Arrange
      const req = {
        body: {},
      };
      const res = {};
      const next = jest.fn();

      // Act
      const result = await create(req, res, next);

      // Assert
      expect(result.status).toBe(400);
      expect(result.data).toHaveProperty("error", "Missing required fields");
    });

    it("should return status 201, place data, and success message if place is created successfully", async () => {
      // Arrange
      const req = {
        body: {
          name: "Example Place",
          region_id: 1,
          placeCategory_id: 2,
        },
      };
      const res = {};
      const next = jest.fn();

      // Act
      const result = await create(req, res, next);

      // Assert
      expect(result.status).toBe(201);
      expect(result.data).toHaveProperty("place");
      expect(result.message).toBe("Place created successfully");
    });

    it("should return status 500 and an error message if an internal server error occurs", async () => {
      // Arrange
      const req = {
        body: {
          name: "Example Place",
          region_id: 1,
          placeCategory_id: 2,
        },
      };
      const res = {};
      const next = jest.fn();
      jest.spyOn(Place, "create").mockRejectedValue(new Error());

      // Act
      const result = await create(req, res, next);

      // Assert
      expect(result.status).toBe(500);
      expect(result.data).toHaveProperty("error", "Internal Server Error");
    });
  });

  describe("getAll function", () => {
    let req, res, next;
    beforeEach(() => {
      req = {};
      res = {
        json: jest.fn(),
        status: jest.fn(() => res),
      };
      next = jest.fn();
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    test("should return all places with a 200 status code", async () => {
      // Arrange
      const expectedPlaces = [mockPlace];
      Place.findAll = jest.fn().mockResolvedValue(expectedPlaces);

      // Act
      const result = await getAll(req, res, next);

      // Assert
      expect(result.status).toBe(200);
      expect(result.data.places).toEqual(expectedPlaces);
    });

    test("should handle errors and return a 500 status code", async () => {
      // Arrange
      const errorMessage = "Some error message";
      const expectedError = { error: "Internal Server Error" };
      Place.findAll = jest.fn().mockRejectedValue(errorMessage);

      // Act
      const result = await getAll(req, res, next);

      // Assert
      expect(result.status).toBe(500);
      expect(result.data).toEqual(expectedError);
    });
  });

  describe("getById", () => {
    it("should return 200 and place object if place exists", async () => {
      // Arange
      const req = { params: { id: 1 } };
      const res = {};
      const next = jest.fn();
      const placeMock = { name: "Place 1" };
      jest.spyOn(Place, "findByPk").mockResolvedValue(placeMock);

      // Act
      const result = await getById(req, res, next);

      // Assert
      expect(result.status).toBe(200);
      expect(result.data.place).toEqual(placeMock);
    });

    it("should return 404 if place does not exist", async () => {
      // Arrange
      const req = { params: { id: 2 } };
      const res = {};
      const next = jest.fn();
      jest.spyOn(Place, "findByPk").mockResolvedValue(null);

      // Act
      const result = await getById(req, res, next);

      // Assert
      expect(result.status).toBe(404);
      expect(result.data.place).toBeNull();
      expect(next).not.toHaveBeenCalled();
    });

    it("should return 500 if an error occurs", async () => {
      // Arrange
      const req = { params: { id: 3 } };
      const res = {};
      const next = jest.fn();
      jest
        .spyOn(Place, "findByPk")
        .mockRejectedValue(new Error("Database error"));

      // Act
      const result = await getById(req, res, next);

      // Assert
      expect(result.status).toBe(500);
      expect(result.data.error).toBe("Internal Server Error");
      expect(next).not.toHaveBeenCalled();
    });
  });

  describe("remove", () => {
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

    describe("when place exists", () => {
      let place;

      beforeEach(() => {
        place = {
          id: 1,
          name: "Test Place",
          destroy: jest.fn(),
        };
        Place.findByPk = jest.fn().mockReturnValue(place);
      });

      test("should call Place.findByPk with the correct id", async () => {
        await remove(req, res, next);
        expect(Place.findByPk).toHaveBeenCalledWith(req.params.id);
      });

      test("should delete the place and return 204", async () => {
        const result = await remove(req, res, next);
        expect(place.destroy).toHaveBeenCalledTimes(1);
        expect(result.status).toEqual(204);
        expect(next).not.toHaveBeenCalled();
      });
    });

    describe("when place does not exist", () => {
      beforeEach(() => {
        Place.findByPk = jest.fn().mockReturnValue(null);
      });

      test("should return error 404 and message 'Place not found'", async () => {
        const result = await remove(req, res, next);
        expect(result.status).toBe(404);
        expect(result.data.error).toBe("Place not found");
      });
    });

    describe("when an error occurs", () => {
      beforeEach(() => {
        const error = new Error("Internal Server Error");
        Place.findByPk = jest.fn().mockRejectedValue(error);
      });

      test("should return error 500 and message 'Internal Server Error'", async () => {
        const result = await remove(req, res, next);
        expect(result.status).toBe(500);
        expect(result.data.error).toBe("Internal Server Error");
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
      });
    });
  });

  describe("update function", () => {
    let req;
    let res;
    let next;

    beforeEach(() => {
      req = {
        params: {
          id: "1",
        },
        body: {
          region_id: 1,
          placeCategory_id: 1,
          photo_id: 1,
          name: "Updated Place",
          openingHour: "9am - 5pm",
          contact: "test@test.com",
          latitude: 37.7749,
          longitude: -122.4194,
          description: "Updated description",
          appointment: "By appointment only",
        },
      };
      res = {};
      next = {};
    });

    afterEach(() => {
      jest.resetAllMocks();
    });

    // test("should update the place if it exists and return 200 status", async () => {
    //   // Arrange
    //   const mockPlace = {
    //     id: 1,
    //     region_id: 1,
    //     placeCategory_id: 2,
    //     photo_id: 3,
    //     name: "Test Place",
    //     openingHour: "8am - 4pm",
    //     contact: "test@test.com",
    //     latitude: 37.7749,
    //     longitude: -122.4194,
    //     description: "Test description",
    //     appointment: "appointment",
    //   };
    //   jest.spyOn(Place, "findByPk").mockResolvedValue(mockPlace);

    //   // Act
    //   const result = await update(req, res, next);

    //   // Assert
    //   expect(Place.findByPk).toHaveBeenCalledTimes(1);
    //   expect(result.status).toEqual(200);
    //   expect(result.data).toEqual({ place: mockPlace });
    // });

    test("should return 404 status if the place is not found", async () => {
      // Arrange
      jest.spyOn(Place, "findByPk").mockResolvedValue(null);

      // Act
      const result = await update(req, res, next);

      // Assert
      expect(Place.findByPk).toHaveBeenCalledTimes(1);
      expect(result.status).toEqual(404);
      expect(result.data).toEqual({ error: "Place not found" });
    });

    test("should return 500 status if an error occurs", async () => {
      // Arrange
      
        jest.spyOn(Place, "findByPk")
        .mockRejectedValue(new Error("Database error"));

      // Act
      const result = await update(req, res, next);

      // Assert
      expect(Place.findByPk).toHaveBeenCalledTimes(1);
      expect(result.status).toEqual(500);
      expect(result.data).toEqual({ error: "Internal Server Error" });
    });
  });
});
