const mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
  name: String,
  image: String,
  description: String,
  price: Number,
  category: Array,
  author: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Author' }],
});
var Product = mongoose.model('Product', productSchema, 'products');

module.exports = Product;
