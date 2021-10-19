const Product = require("../models/product.model");
const Session = require("../models/session.model");
const Comment = require("../models/comment.model");
const User = require("../models/user.model");

module.exports.index = async function (req, res) {
  var userId = req.signedCookies.userId;
  if (userId) {
    var user = await User.findById(userId);
  }
  var productCount = await (await Session.find({ userId: userId })).length;

  var perPage = 8;
  var page = req.params.currentPage || 1;

  Product.find()
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.countDocuments((err, count) => {
        if (err) return next(err);
        res.render("products/index", {
          user: user,
          products: products,
          current: page,
          pages: Math.ceil(count / perPage),
          productCount: productCount,
        });
      });
    });
};

module.exports.detail = async function (req, res) {
  var userId = req.signedCookies.userId;
  if (userId) {
    var user = await User.findById(userId);
  }

  var productCount = await (await Session.find({ userId: userId })).length;

  var id = req.params.id;

  var product = await Product.findById(id);
  var comments = await Comment.find({ productId: id });
  var commentCount = await (await Comment.find({ productId: id })).length;
  res.render("products/details", {
    user: user,
    product: product,
    productCount: productCount,
    comments: comments,
    commentCount: commentCount,
  });
};

module.exports.comment = async function (req, res) {
  var userId = req.signedCookies.userId;
  var content = req.body.comment;
  var productId = req.params.id;

  if (userId) {
    var user = await User.findById(userId);
    var date = new Date();
    var commentDate = date.toLocaleString(["vi-VN", "en-US"]);
    await Comment.create({
      user: user,
      productId: productId,
      content: content,
      commentDate: commentDate,
    });
    res.redirect("/products/detail/" + productId);
  } else {
    res.redirect("/auth/login");
  }
};

module.exports.pagination = async function (req, res) {
  var userId = req.signedCookies.userId;
  if (userId) {
    var user = await User.findById(userId);
  }
  var productCount = await (await Session.find({ userId: userId })).length;
  var perPage = 8;
  var page = req.params.currentPage || 1;

  Product.find()
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.countDocuments((err, count) => {
        if (err) return next(err);
        res.render("products/index", {
          user: user,
          products: products,
          current: page,
          pages: Math.ceil(count / perPage),
          productCount: productCount,
        });
      });
    });
};

module.exports.search = async function (req, res) {
  var userId = req.signedCookies.userId;
  if (userId) {
    var user = await User.findById(userId);
  }
  var productCount = await (await Session.find({ userId: userId })).length;

  var q = req.query.q;
  const regex = new RegExp(q, "i");
  var products = await Product.find({
    name: { $regex: regex },
  });

  res.render("products/index", {
    user: user,
    products: products,
    productCount: productCount,
  });
};

module.exports.sort = async function (req, res) {
  var p = Number(req.query.price);
  var userId = req.signedCookies.userId;
  if (userId) {
    var user = await User.findById(userId);
  }
  var productCount = await (await Session.find({ userId: userId })).length;

  if (p === 1) {
    var products = await Product.find().sort({ price: p });
  } else if (p === -1) {
    products = await Product.find().sort({ price: p });
  } else {
    products = await Product.find();
  }

  res.render("products/index", {
    user: user,
    products: products,
    productCount: productCount,
  });
};
