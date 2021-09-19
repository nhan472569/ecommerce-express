const Product = require("../models/product.model");

module.exports.index = async function (req, res) {
  var products = await Product.find();
  res.render("products/index", {
    products: products,
  });
};

module.exports.detail = async function (req, res) {
  var id = req.params.id;

  var product = await Product.findById(id);

  res.render("products/details", {
    product: product,
  });
};
