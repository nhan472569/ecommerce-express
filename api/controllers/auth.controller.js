const md5 = require("md5");
var User = require("../../models/user.model");

module.exports.login = async function (req, res) {
  var postEmail = req.body.email;
  if (!postPassword) {
    res.json({
      message: "Vui lòng nhập tên đăng nhập",
    });
    return;
  }
  var postPassword = req.body.password;
  if (!postPassword) {
    res.json({
      message: "Vui lòng nhập mật khẩu",
    });
    return;
  }

  var hashedPassword = md5(postPassword);

  var userArray = await User.find({ email: postEmail });

  if (userArray.length === 0) {
    res.json({
      message: "Sai tên đăng nhập",
    });
    return;
  }

  var user = userArray.find((u) => u.password === hashedPassword);
  if (!user) {
    res.json({
      message: "Sai mật khẩu đăng nhập",
    });
    return;
  }

  res.json({
    message: "Đăng nhập thành công",
    userId: user.id,
    email: user.email,
  });
};

module.exports.register = async function (req, res) {
  var email = req.body.email;
  if (!email) {
    res.json({
      message: "Vui lòng nhập tên đăng nhập",
    });
    return;
  }
  var password = req.body.password;
  if (!password) {
    res.json({
      message: "Vui lòng nhập mật khẩu",
    });
    return;
  }
  var retypePassword = req.body.retypePassword;
  if (!retypePassword) {
    res.json({
      message: "Vui lòng nhập mật khẩu xác thực",
    });
    return;
  }

  if (password !== retypePassword) {
    res.json({
      message: "Mật khẩu 2 lần nhập không khớp",
    });
    return;
  }

  var hashedPassword = md5(password);

  await User.create({ email: email, password: hashedPassword }).catch((err) => {
    console.error(err);
  });

  res.json({
    message: "Đăng ký tài khoản thành công",
  });
};
