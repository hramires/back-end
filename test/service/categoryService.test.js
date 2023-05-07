const { before } = require("lodash");
const Category = require("../../src/models/category");
const {
  create,
  getAll,
  getById,
  update,
  remove,
} = require("../../src/services/categoryService");

jest.mock("../../src/models/category");

describe("categoryService", () => {
        
  let mockCategory;
  let mockCreatedCategory;
  beforeAll(() => {
    mockCategory = {
            name : "categoryTest",
        };

        mockCreatedCategory = {
          _id: "610f4c4a04607d00447ceecd",
          ...mockCategory,
      };
    });

        // afterEach(() => {
        //     jest.restoreAllMocks();
        // });
    describe("create category", () => {
        it("should return status 400 and an error message if name is missing", async () => {
            // Arrange
            const req = { body: { name: "" } };
            const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
            const next = jest.fn();
      
            // Act
            const result = await create(req, res, next);
      
            // Assert
            expect(result.status).toBe(400);
            expect(result.data).toHaveProperty("error", "Nome da categoria não deve ser vazio.");
          });

          it("should return status 400 and an error message if name lenght is <= 3 ", async () => {
            // Arrange
            const req = {
              body: {name: "OI"},
            };
            const res = {};
            const next = jest.fn();
      
            // Act
            const result = await create(req, res, next);
      
            // Assert
            expect(result.status).toBe(400);
            expect(result.data).toHaveProperty("error", "Nome da categoria deve possuir 4 ou mais caracteres.");
          });

          it("should return 404 if category does not exist", async () => {
            // Arrange
            const req = { params: { id : 1} };
            const res = {};
            const next = jest.fn();
            jest.spyOn(Category, "findByPk").mockResolvedValue(null);
      
            // Act
            const result = await getById(req, res, next);
      
            // Assert
            expect(result.status).toBe(404);
            expect(result.data.category).toBeNull();
            expect(next).not.toHaveBeenCalled();
          });
      
    });

    describe("getAll category", () => {
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
      it("getAll categorys successfully", async () => {
      // Arrange
     const expectedCategory = [mockCategory];
     Category.findAll = jest.fn().mockResolvedValue(expectedCategory);

     // Act
     const result = await getAll(req, res, next);

     // Assert
     expect(result.status).toBe(200);
     expect(result.data.categories).toEqual(expectedCategory);
     
      // it("getAll categorys successfully", async () => {
      //     // Arrange
      //     const req = {}
      //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
      //     const next = jest.fn();
      //     const expectedCategory = {name: "TESTE"};
      //     Category.findAll = jest.fn().mockResolvedValue(expectedCategory);
    
      //     // Act
      //     const result = await create(req, res, next);
    
      //     // Assert
      //     expect(result.status).toBe(200);
      //     expect(result.data).toHaveProperty(expectedCategory);
        });

      it("getAll categorys unsuccessfully", async () => { 
          //Arrange
          const req = {}
          const res = {};
          const next = jest.fn();
          const errorMessage = "Some error message";
          const expectedError = { error: "Internal Server Error" };
          Category.findAll = jest.fn().mockRejectedValue(errorMessage);

        // Act
        const result = await getAll(req, res, next);

        // Assert
        expect(result.status).toBe(500);
        expect(result.data).toEqual(expectedError);
        });
    
  });

    describe("getById", () => {
      it("should return 200 and category object if category exists", async () => {
        // Arange
        const req = { params: { id: 1 } };
        const res = {};
        const next = jest.fn();
        const categoryMock = { name: "Category 1" };
        jest.spyOn(Category, "findByPk").mockResolvedValue(categoryMock);
  
        // Act
        const result = await getById(req, res, next);
  
        // Assert
        expect(result.status).toBe(200);
        expect(result.data.category).toEqual(categoryMock);
      });

      it("should return 404 if category does not exist", async () => {
        // Arrange
        const req = { params: { id: 2 } };
        const res = {};
        const next = jest.fn();
        jest.spyOn(Category, "findByPk").mockResolvedValue(null);
  
        // Act
        const result = await getById(req, res, next);
  
        // Assert
        expect(result.status).toBe(404);
        expect(result.data.category).toBeNull();
        expect(next).not.toHaveBeenCalled();
      });
  
      it("should return 500 if an error occurs", async () => {
        // Arrange
        const req = { params: { id: 3 } };
        const res = {};
        const next = jest.fn();
        jest
          .spyOn(Category, "findByPk")
          .mockRejectedValue(new Error("Database error"));
  
        // Act
        const result = await getById(req, res, next);
  
        // Assert
        expect(result.status).toBe(500);
        expect(result.data.error).toBe("Internal Server Error");
        expect(next).not.toHaveBeenCalled();
      });
    });

    // //REVISAR
    // describe("update", () => {
    //   it("should return status 400 and an error message if name is missing", async () => {
    //     // Arrange
    //     const req = { body: { name: "" } };
    //     const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    //     const next = jest.fn();
  
    //     // Act
    //     const result = await update(req, res, next);
  
    //     // Assert
    //     expect(result.status).toBe(400);
    //     expect(result.data).toHaveProperty("error", "Nome da categoria não deve ser vazio.");
    //   });

    //   it("should return status 400 and an error message if name lenght is <= 3 ", async () => {
    //     // Arrange
    //     const req = {
    //       body: {name: "OI"},
    //     };
    //     const res = {};
    //     const next = jest.fn();
  
    //     // Act
    //     const result = await create(req, res, next);
  
    //     // Assert
    //     expect(result.status).toBe(400);
    //     expect(result.data).toHaveProperty("error", "Nome da categoria deve possuir 4 ou mais caracteres.");
    //   });

    //   it("should return status 200 and update successfully ", async () => {
        
    //   });

    //   it("should return 404 if category does not exist", async () => {
    //     // Arrange
    //     const req = { params: { id: 2 } };
    //     const res = {};
    //     const next = jest.fn();
    //     jest.spyOn(Category, "findByPk").mockResolvedValue(null);
  
    //     // Act
    //     const result = await getById(req, res, next);
  
    //     // Assert
    //     expect(result.status).toBe(404);
    //     expect(result.data.category).toBeNull();
    //     expect(next).not.toHaveBeenCalled();
    //   });

    //   it("should return 500 if an error occurs", async () => {
    //     // Arrange
    //     const req = { params: { id: 3 } };
    //     const res = {};
    //     const next = jest.fn();
    //     jest
    //       .spyOn(Category, "findByPk")
    //       .mockRejectedValue(new Error("Database error"));
  
    //     // Act
    //     const result = await update(req, res, next);
  
    //     // Assert
    //     expect(result.status).toBe(500);
    //     expect(result.data.error).toBe("Internal Server Error");
    //     expect(next).not.toHaveBeenCalled();
    //   });

    // })
    describe("update function", () => {
      let req;
      let res;
      let next;
  
      beforeEach(() => {
        req = {
          params: {
            id: 1,
          },
          body: {
            name: 'New Category Name',
          },
        };
        res = {
          json: jest.fn(),
        };
        next = jest.fn();
      });
    
      afterEach(() => {
        jest.clearAllMocks();
      });

  
      afterEach(() => {
        jest.resetAllMocks();
      });
      it("should return 404 status if the category is not found", async () => {
        // Arrange
        jest.spyOn(Category, "findByPk").mockResolvedValue(null);
  
        // Act
        const result = await update(req, res, next);
  
        // Assert
        //expect(Category.findByPk).toHaveBeenCalledTimes(1);
        expect(result.status).toEqual(404);
        expect(result.data).toEqual({ error: "Category not found" });
      });
  
      it("should return 500 status if an error occurs", async () => {
        // Arrange
          jest.spyOn(Category, "findByPk")
          .mockRejectedValue(new Error("Database error"));
  
        // Act
        const result = await update(req, res, next);
  
        // Assert
        expect(Category.findByPk).toHaveBeenCalledTimes(1);
        expect(result.status).toEqual(500);
        expect(result.data).toEqual({ error: "Internal Server Error" });
      });

      it("should return 200 and update successfully", async () => {
        // Arrange 
        const category = {id: 1, name: "oldCategory"}
        jest.spyOn(Category, "findByPk").mockResolvedValue(category);
        category.update = jest.fn().mockResolvedValueOnce(category);
  
        // Act
        const result = await update(req, res, next);
  
        // Assert
        //expect(Category.findByPk).toHaveBeenCalledTimes(1);
        expect(result.status).toEqual(200);
        expect(result.data).toEqual({ category });
      });

      it("should return 400 and an error message if name is missing ", async () => {
        // Arrange 
        req.body.name = ""
        const category = {id: 1, name: "oldCategory"}
        jest.spyOn(Category, "findByPk").mockResolvedValue(category);
        category.update = jest.fn().mockResolvedValueOnce(category);
  
        // Act
        const result = await update(req, res, next);
  
        // Assert
        //expect(Category.findByPk).toHaveBeenCalledTimes(1);
        expect(result.status).toEqual(400);
        expect(result.data).toHaveProperty("error", "Nome da categoria não deve ser vazio.");
      });

      it("should return status 400 and an error message if name lenght is <= 3  ", async () => {
        // Arrange 
        req.body.name = "New"
        const category = {id: 1, name: "oldCategory"}
        jest.spyOn(Category, "findByPk").mockResolvedValue(category);
        category.update = jest.fn().mockResolvedValueOnce(category);
  
        // Act
        const result = await update(req, res, next);
  
        // Assert
        //expect(Category.findByPk).toHaveBeenCalledTimes(1);
        expect(result.status).toEqual(400);
        expect(result.data).toHaveProperty("error", "Nome da categoria deve possuir 4 ou mais caracteres.");
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

    describe("when category exists", () => {
      let category;

      beforeEach(() => {
        category = {
          id: 1,
          name: "Test Category",
          destroy: jest.fn(),
        };
        Category.findByPk = jest.fn().mockReturnValue(category);
      });

      it("should call Category.findByPk with the correct id", async () => {
        await remove(req, res, next);
        expect(Category.findByPk).toHaveBeenCalledWith(req.params.id);
      });

      it("should delete the category and return 204", async () => {
        const result = await remove(req, res, next);
        expect(category.destroy).toHaveBeenCalledTimes(1);
        expect(result.status).toEqual(204);
        expect(next).not.toHaveBeenCalled();
      });
    });

    describe("when category does not exist", () => {
      beforeEach(() => {
        Category.findByPk = jest.fn().mockReturnValue(null);
      });

      test("should return error 404 and message 'Category not found'", async () => {
        const result = await remove(req, res, next);
        expect(result.status).toBe(404);
        expect(result.data.error).toBe("Category not found");
      });
    });

    describe("when an error occurs", () => {
      beforeEach(() => {
        const error = new Error("Internal Server Error");
        Category.findByPk = jest.fn().mockRejectedValue(error);
      });

      test("should return error 500 and message 'Internal Server Error'", async () => {
        const result = await remove(req, res, next);
        expect(result.status).toBe(500);
        expect(result.data.error).toBe("Internal Server Error");
        expect(res.status).not.toHaveBeenCalled();
        expect(res.send).not.toHaveBeenCalled();
      });
    });
    })
  });