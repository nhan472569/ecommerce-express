const mongoose = require("mongoose");

var orderSchema = new mongoose.Schema({
  orderDate: Date,
  userId: String,
  name: String,
  email: String,
  phoneNumber: String,
  address: String,
  detail: Array,
});
var Order = mongoose.model("Order", orderSchema, "orders");

module.exports = Order;
