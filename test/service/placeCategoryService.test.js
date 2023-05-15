const PlaceCategory = require("../../src/models/placeCategory");
const{
    createPlaceCategory,
    getAllByPlaceId,
    updatePlaceCategory,
    removePlaceCategory
} = require("../../src/services/placeCategoryService");

jest.mock("../../src/models/placeCategory");

describe("placeCategoryService"), ()=>{

    let mockPlaceCategory;
    let mockCreatedPlaceCategory;

    beforeAll(()=> {
        mockPlaceCategory={
            place_id: 1,
            category_id: 1,
        };
        mockCreatedPlaceCategory = {
            _id: "610f4c4a04607d00447ceecd",
            ...mockPlaceCategory,
        }

    })
}

afterEach(() => {
    jest.restoreAllMocks();
})

describe("create palceCategory", () => {
    
})