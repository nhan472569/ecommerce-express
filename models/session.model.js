const mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  productImage: String,
  quantity: Number,
  price: Number,
  userId: String,
});
var Session = mongoose.model("Session", sessionSchema, "sessions");

module.exports = Session;
