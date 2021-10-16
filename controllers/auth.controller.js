const md5 = require("md5");
const User = require("../models/user.model");

module.exports.login = function (req, res) {
  res.render("auth/login");
};

module.exports.logout = function (req, res) {
  res.clearCookie("userId");
  res.redirect("/products");
};

module.exports.postLogin = async function (req, res) {
  var errors = [];
  var postEmail = req.body.email;
  var postPassword = req.body.password;

  var hashedPassword = md5(postPassword);

  var userArray = await User.find({ email: postEmail });

  if (userArray.length === 0) {
    errors.push("Email không tồn tại");
    res.render("auth/login", {
      errors: errors,
      values: req.body,
    });
    return;
  }

  var user = userArray.find((u) => u.password === hashedPassword);
  if (!user) {
    errors.push("Sai mật khẩu");
    res.render("auth/login", {
      errors: errors,
      values: req.body,
    });
    return;
  }

  res.cookie("userId", user.id, {
    signed: true,
  });

  res.redirect("/products");
};

module.exports.register = function (req, res) {
  res.render("auth/register");
};

module.exports.postRegister = async function (req, res) {
  var email = req.body.email;
  var password = req.body.password;
  var retypePassword = req.body.retypePassword;

  var existEmail = await User.find({ email: email });
  if (existEmail.length != 0) {
    res.render("auth/register", {
      errors: ["Email đã tồn tại"],
      values: req.body,
    });
  }

  if (password !== retypePassword) {
    res.render("auth/register", {
      errors: ["Mật khẩu xác minh không khớp"],
      values: req.body,
    });
  }

  var hashedPassword = md5(password);

  await User.create({
    email: email,
    password: hashedPassword,
    avatar:
      "https://res.cloudinary.com/nhan472569/image/upload/v1634360823/1024px-User-avatar.svg_oinsuq.png",
  });

  res.redirect("/auth/login");
};
