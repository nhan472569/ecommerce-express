const mongoose = require("mongoose");

var orderDetailSchema = new mongoose.Schema({
  productId: String,
  productName: String,
  quantity: Number,
  price: Number,
  userId: String,
});
var OrderDetail = mongoose.model(
  "OrderDetail",
  orderDetailSchema,
  "order_detail"
);

module.exports = OrderDetail;
