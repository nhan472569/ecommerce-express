const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  price: Number,
  category: Array,
  author: Array,
});
var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
