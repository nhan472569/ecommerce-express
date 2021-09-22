const mongoose = require("mongoose");

var sessionSchema = new mongoose.Schema({
  productName: String,
  price: Number,
  userId: String,
});
var Session = mongoose.model("Session", sessionSchema, "sessions");

module.exports = Session;
