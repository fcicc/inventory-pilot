const Item = require("../models/Item");

exports.index = (req, res) => {
  const { searchTerm } = req.query; // Get search term from query string

  Item.findItems(searchTerm)
    .then((items) => {
      res.render("items/index", { items, searchTerm });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving items");
    });
};

exports.addItem = (req, res) => {
  const { name, description, quantity, price } = req.body;

  // Validation
  if (!name || !quantity || !price) {
    return res.status(400).send("Please fill in all required fields.");
  }

  // Create new item
  const newItem = new Item({
    name,
    description,
    quantity,
    price,
  });

  // Save item to database
  newItem
    .save()
    .then(() => {
      res.redirect("/items");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error adding item.");
    });
};

exports.getUpdateItem = (req, res) => {
  const itemId = req.params.id;

  Item.findById(itemId)
    .then((item) => {
      if (!item) {
        return res.status(404).send("Item not found.");
      }

      res.render("items/update", { item });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error retrieving item.");
    });
};

exports.postUpdateItem = (req, res) => {
  const itemId = req.params.id;
  const { name, description, quantity, price } = req.body;

  // Validation
  if (!name || !quantity || !price) {
    return res.status(400).send("Please fill in all required fields.");
  }

  // Find and update item
  Item.findByIdAndUpdate(itemId, { name, description, quantity, price })
    .then(() => {
      res.redirect("/items");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error updating item.");
    });
};

exports.deleteItem = (req, res) => {
  const itemId = req.params.id;

  // Delete item from database
  Item.findByIdAndDelete(itemId)
    .then(() => {
      res.redirect("/items");
    })
    .catch((err) => {
      console.error(err);
      res.status(500).send("Error deleting item.");
    });
};
