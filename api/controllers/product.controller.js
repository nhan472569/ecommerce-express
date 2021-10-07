var Product = require("../../models/product.model");

module.exports.index = async function (req, res) {
  var products = await Product.find();
  res.json(products);
};

module.exports.getProductByID = async function (req, res) {
  var productID = req.params.productID;
  var product = await Product.findById(productID);
  res.json(product);
};
