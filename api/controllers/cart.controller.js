const Product = require("../../models/product.model");
const Session = require("../../models/session.model");
const Order = require("../../models/order.model");
const User = require("../../models/user.model");

module.exports.index = async function (req, res) {
  var userId = req.signedCookies.userId;
  if (!userId) {
    res.json({
      message: "Vui lòng đăng nhập",
      isLoggedIn: false,
    });
  }

  var shoppingList = await Session.find({ userId: userId });

  res.json({
    shoppingList,
  });
};

module.exports.add = async function (req, res) {
  var productId = req.body.productID;
  var userId = req.signedCookies.userId;

  var product = await Product.findById(productId);
  var image = product.image;
  var productName = product.name;
  var productPrice = product.price;

  var findProductOnSesssion = await Session.find({
    userId: userId,
    productId: productId,
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
    res.json({
      message: "Thêm hàng vào giỏ thành công",
    });
    return;
  }

  quantity = findProductOnSesssion[0].quantity + 1;
  await Session.updateOne(
    { productId: productId, userId: userId },
    { quantity: quantity, price: quantity * productPrice }
  );
  res.json({
    message: "Cập nhật số lượng thành công",
  });
};

module.exports.delete = async function (req, res) {
  var sessionID = req.body.sessionID;

  Session.deleteOne({ _id: sessionID }, function (err) {
    if (!err) {
      res.json({
        message: "Xóa sản phẩm trong giỏ thành công",
      });
    } else {
      console.log(err);
    }
  });
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

  res.json({
    message: "Đặt hàng thành công",
  });
};
