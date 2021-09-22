const Product = require("../models/product.model");
const Session = require("../models/session.model");

module.exports.index = async function (req, res) {
  var userId = req.signedCookies.userId;

  var shoppingList = await Session.find({ userId: userId });
  var totalPrice = shoppingList.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue.price;
  }, 0);

  res.render("cart/index", {
    products: shoppingList,
    productCount: shoppingList.length,
    totalPrice: totalPrice,
  });
};

module.exports.create = async function (req, res) {
  var productId = req.params.productId;
  var userId = req.signedCookies.userId;

  var product = await Product.findById(productId);
  var productName = product.name;
  var productPrice = product.price;

  await Session.create({
    productName: productName,
    price: productPrice,
    userId: userId,
  });

  res.redirect("/products");
};

module.exports.delete = async function (req, res) {
  var productId = req.params.cartProductId;
  var userId = req.signedCookies.userId;

  var product = await Session.findById(productId);
  var productName = product.productName;
  await Session.deleteOne({ productName: productName, userId: userId });

  res.redirect("/cart");
};
