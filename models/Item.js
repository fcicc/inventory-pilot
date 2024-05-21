const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const ItemSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  quantity: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
});

ItemSchema.statics.findItems = function (searchTerm) {
  if (searchTerm) {
    // Search for items by name and description
    return this.find({
      $or: [
        { name: { $regex: searchTerm, $options: "i" } },
        { description: { $regex: searchTerm, $options: "i" } },
      ],
    });
  }
  // If no search term, display all items
  return this.find();
};

ItemSchema.methods.isLowQuantity = function () {
  return this.quantity <= 5;
};

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
