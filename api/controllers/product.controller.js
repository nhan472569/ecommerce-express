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

module.exports.sort = async function (req, res) {
  var p = Number(req.query.price);

  if (p === 1) {
    var products = await Product.find().sort({ price: p });
  } else if (p === -1) {
    products = await Product.find().sort({ price: p });
  } else {
    products = await Product.find();
  }

  res.json(products);
};
