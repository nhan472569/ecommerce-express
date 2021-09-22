const Product = require("../models/product.model");
const Session = require("../models/session.model");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");

module.exports.index = async function (req, res) {
  var userId = req.signedCookies.userId;
  var productCount = await (await Session.find({ userId: userId })).length;
  var products = await Product.find();

  res.render("products/index", {
    products: products,
    productCount: productCount,
  });
};

module.exports.detail = async function (req, res) {
  var userId = req.signedCookies.userId;

  var productCount = await (await Session.find({ userId: userId })).length;

  var id = req.params.id;

  var product = await Product.findById(id);
  var comments = await Comment.find({ productId: id });
  var commentCount = await (await Comment.find({ productId: id })).length;
  res.render("products/details", {
    product: product,
    productCount: productCount,
    comments: comments,
    commentCount: commentCount,
  });
};

module.exports.comment = async function (req, res) {
  var userId = req.signedCookies.userId;
  var content = req.body.comment;

  var id = req.params.id;

  var user = await User.findById(userId);
  var userEmail = user.email;

  await Comment.create({
    userName: userEmail,
    productId: id,
    content: content,
  });
  res.redirect("/products/detail/" + id);
};

module.exports.search = async function (req, res) {
  var userId = req.signedCookies.userId;
  var productCount = await (await Session.find({ userId: userId })).length;

  var q = req.query.q;
  const regex = new RegExp(q, "i");
  var products = await Product.find({ name: { $regex: regex } });
  res.render("products/index", {
    products: products,
    productCount: productCount,
  });
};

module.exports.sort = async function (req, res) {
  var p = Number(req.query.price);
  var userId = req.signedCookies.userId;
  var productCount = await (await Session.find({ userId: userId })).length;

  if (p === 1) {
    var products = await Product.find().sort({ price: p });
  } else if (p === -1) {
    products = await Product.find().sort({ price: p });
  } else {
    products = await Product.find();
  }

  res.render("products/index", {
    products: products,
    productCount: productCount,
  });
};
