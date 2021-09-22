const mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  price: Number,
});
var Product = mongoose.model("Product", productSchema, "product");

module.exports = Product;
