const Product = require("../models/product.model");
const Session = require("../models/session.model");
const Order = require("../models/order.model");
const User = require("../models/user.model");

module.exports.index = async function (req, res) {
  var userId = req.signedCookies.userId;
  var userObject = await User.findById(userId);
  var user = userObject.email;

  var shoppingList = await Session.find({ userId: userId });
  var totalPrice = shoppingList.reduce(function (previousValue, currentValue) {
    return previousValue + currentValue.price;
  }, 0);

  res.render("cart/index", {
    user: user,
    products: shoppingList,
    productCount: shoppingList.length,
    totalPrice: totalPrice,
  });
};

module.exports.create = async function (req, res) {
  var productId = req.params.productId;
  var userId = req.signedCookies.userId;

  var product = await Product.findById(productId);
  var image = product.image;
  var productName = product.name;
  var productPrice = product.price;

  var findProductOnSesssion = await Session.find({
    productId: productId,
    userId: userId,
  });

  if (findProductOnSesssion.length == 0) {
    quantity = 1;
    await Session.create({
      productId: productId,
      productName: productName,
      productImage: image,
      quantity: quantity,
      price: productPrice,
      userId: userId,
    });
    res.redirect("/products");
  }

  quantity = findProductOnSesssion[0].quantity + 1;
  await Session.updateOne(
    { productId: productId },
    { quantity: quantity, price: quantity * productPrice }
  );
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

module.exports.order = async function (req, res) {
  var userId = req.signedCookies.userId;
  var orderDate = Date.now();
  var shoppingList = await Session.find({ userId: userId });

  await Order.create({
    orderDate: orderDate,
    userId: userId,
    name: req.body.name,
    email: req.body.email,
    phoneNumber: req.body.phone,
    address: req.body.address,
    detail: shoppingList,
  });

  await Session.deleteMany({ userId: userId });
  res.redirect("/products");
};
