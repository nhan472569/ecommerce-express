const express = require("express");
const app = express();
const productController = require("../controllers/product.controller");

app.get("/", productController.load);

module.exports = app;
