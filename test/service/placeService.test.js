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
    expect(result.status).toBe(200);
    expect(result.data.place).toEqual(mockPlace);
  });

  it("should handle errors when creating a new place", async () => {
    const mockCreate = jest.spyOn(Place, "create");
    mockCreate.mockImplementationOnce(() => {
      throw new Error("UnknownError");
    });
    //const error = new Error("Database error");
    //mockCreate.mockRejectedValue(error);

    const req = { body: {} };
    const res = {};
    const next = jest.fn();
    const result = await create(req, res, next);

    expect(mockCreate).toHaveBeenCalledWith({});
    //expect(next).toHaveBeenCalledWith(error);
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
    // const error = new Error("Database error");
    // mockFindAll.mockRejectedValue(error);
    mockFindAll.mockImplementationOnce(() => {
      throw new Error("UnknownError");
    });
    const req = {};
    const res = {};
    const next = jest.fn();
    const result = await getAll(req, res, next);
    //console.log(result);
    expect(mockFindAll).toHaveBeenCalled();
    //expect(next).toHaveBeenCalledWith(error);
  });
});
