const Item = require("../models/Item");

exports.index = async (req, res) => {
  const { searchTerm } = req.query; // Get search term from query string

  try {
    const items = await Item.findItems(searchTerm);
    res.render("items/index", { items, searchTerm });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving items");
  }
};

exports.addItem = async (req, res) => {
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

  try {
    await newItem.save();
    res.redirect("/items");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error adding item.");
  }
};

exports.getUpdateItem = async (req, res) => {
  const itemId = req.params.id;

  try {
    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).send("Item not found.");
    }

    res.render("items/update", { item });
  } catch (err) {
    console.error(err);
    res.status(500).send("Error retrieving item.");
  }
};

exports.postUpdateItem = async (req, res) => {
  const itemId = req.params.id;
  const { name, description, quantity, price } = req.body;

  // Validation
  if (!name || !quantity || !price) {
    return res.status(400).send("Please fill in all required fields.");
  }

  try {
    await Item.findByIdAndUpdate(itemId, { name, description, quantity, price });
    res.redirect("/items");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error updating item.");
  }
};

exports.deleteItem = async (req, res) => {
  const itemId = req.params.id;

  try {
    await Item.findByIdAndDelete(itemId);
    res.redirect("/items");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting item.");
  }
};
