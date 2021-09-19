const mongoose = require("mongoose");

var productSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
});
productSchema.index({ name: "text", "profile.something": "text" });
var Product = mongoose.model("Product", productSchema, "product");

module.exports = Product;
