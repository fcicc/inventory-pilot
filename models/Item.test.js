const Item = require(".//Item");

describe("Item Model", () => {
  // Define a test item
  const testItem = {
    name: "Apple",
    description: "Red apple",
    quantity: 5,
    price: 1.5,
  };

  // Before each test, create a new instance of the Item model
  beforeEach(() => {
    jest.clearAllMocks();
  });

  // Test the `findItems` static method
  describe("findItems", () => {
    it("should return all items if no search term is provided", async () => {
      // Mock the find method to return an array of items
      jest.spyOn(Item, "find").mockResolvedValue([testItem]);

      // Call the findItems method
      const items = await Item.findItems();

      // Expect the find method to be called with no arguments
      expect(Item.find).toHaveBeenCalledWith();

      // Expect the returned items to be an array containing the test item
      expect(items).toEqual([testItem]);
    });

    it("should return items that match the search term", async () => {
      // Mock the find method to return an array of items
      jest.spyOn(Item, "find").mockResolvedValue([testItem]);

      // Call the findItems method with a search term
      const items = await Item.findItems("Apple");

      // Expect the find method to be called with the search term
      expect(Item.find).toHaveBeenCalledWith({
        $or: [
          { name: { $regex: "Apple", $options: "i" } },
          { description: { $regex: "Apple", $options: "i" } },
        ],
      });

      // Expect the returned items to be an array containing the test item
      expect(items).toEqual([testItem]);
    });
  });

  // Test the `getStockStatus` method
  describe("getStockStatus", () => {
    it("should return 'Out of Stock' for items with quantity 0", () => {
      // Create a new Item instance with a quantity of 0
      const item = new Item({ ...testItem, quantity: 0 });

      // Expect the getStockStatus method to return "Out of Stock"
      expect(item.getStockStatus()).toBe("Out of Stock");
    });

    it("should return 'Low Stock' for items with quantity less than or equal to 5", () => {
      // Create a new Item instance with a quantity of 5
      const item = new Item({ ...testItem, quantity: 5 });

      // Expect the getStockStatus method to return "Low Stock"
      expect(item.getStockStatus()).toBe("Low Stock");
    });

    it("should return 'In Stock' for items with quantity greater than 5", () => {
      // Create a new Item instance with a quantity of 10
      const item = new Item({ ...testItem, quantity: 10 });

      // Expect the getStockStatus method to return "In Stock"
      expect(item.getStockStatus()).toBe("In Stock");
    });
  });
});
