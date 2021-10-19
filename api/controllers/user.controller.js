const User = require("../../models/user.model");

module.exports.getUser = async function (req, res) {
  const userId = req.body.userID;
  if (!userId) {
    res.json({
      message: "Vui lòng đăng nhập",
      status: false,
    });
  } else {
    User.findById(userId, function (err, foundUser) {
      if (!err) {
        res.json(foundUser);
      } else {
        res.send(err);
      }
    });
  }
};
