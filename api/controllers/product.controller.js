const Product = require('../../models/product.model');
const Comment = require('../../models/comment.model');
const User = require('../../models/user.model');
const Author = require('../../models/author.model');

module.exports.index = async function (req, res) {
  await Product.find()
    .populate('author')
    .exec((err, products) => {
      console.log(products);
      return res.status(200).json(products);
    });
};

module.exports.getProductByID = async function (req, res) {
  var productID = req.params.productID;
  var product = await Product.findById(productID);
  res.json(product);
};

module.exports.getProductsByCategory = async function (req, res) {
  let category = req.query.category;
  var products = await Product.find({
    category,
  });

  res.json(products);
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

module.exports.search = async function (req, res) {
  var q = req.query.q;
  const regex = new RegExp(q, 'i');
  var products = await Product.find({
    name: { $regex: regex },
  });

  res.json(products);
};

module.exports.pagination = async function (req, res) {
  var perPage = 8;
  var page = req.query.page || 1;

  Product.find()
    .skip(perPage * page - perPage)
    .limit(perPage)
    .exec((err, products) => {
      Product.countDocuments((err, count) => {
        if (err) return next(err);
        res.json({
          products: products,
        });
      });
    });
};

module.exports.getComment = async function (req, res) {
  var productId = req.params.productID;

  const comments = await Comment.find({ productId: productId });
  return res.status(200).json(comments);
};

module.exports.postComment = async function (req, res) {
  var userId = req.body.userID;
  var content = req.body.content;
  var productId = req.params.productID;

  if (userId) {
    var user = await User.findById(userId);
    var date = new Date();
    var commentDate = date.toLocaleString(['vi-VN', 'en-US']);
    await Comment.create({
      user: user,
      productId: productId,
      content: content,
      commentDate: commentDate,
    });
    return res.status(200).json({
      message: 'Thêm bình luận thành công',
      status: true,
    });
  }

  return res.status(404).json({
    message: 'Vui lòng đăng nhập',
    status: false,
  });
};
