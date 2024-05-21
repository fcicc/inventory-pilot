require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const itemsController = require("./controllers/itemsController");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

const uri = process.env.MONGODB_URI;

mongoose
  .connect(uri)
  .then(() => {
    console.log("Connected to MongoDB");

    app.use(bodyParser.urlencoded({ extended: true }));

    app.get("/", (req, res) => {
      res.redirect("/items");
    });

    app.get("/items", itemsController.index);

    app.post("/items/add", itemsController.addItem);

    app.get("/items/update/:id", itemsController.getUpdateItem);
    app.post("/items/update/:id", itemsController.postUpdateItem);

    app.post("/items/delete/:id", itemsController.deleteItem);

    app.listen(port, () => {
      console.log(`Server listening on port ${port}`);
    });
  })
  .catch((err) => {
    console.error(err);
  });
