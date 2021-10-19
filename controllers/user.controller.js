const User = require("../models/user.model");
const Session = require("../models/session.model");

module.exports.getUser = async function (req, res) {
  const userId = req.signedCookies.userId;
  var shoppingList = await Session.find({ userId });

  User.findById(userId, function (err, foundUser) {
    if (!err) {
      res.render("user/index", {
        info: foundUser,
        user: foundUser,
        productCount: shoppingList.length,
      });
    } else {
      console.log(err);
    }
  });
};

module.exports.updateUser = function (req, res) {
  const userId = req.signedCookies.userId;
  User.updateOne({ _id: userId }, { $set: req.body }, function (err, result) {
    if (!err) {
      res.redirect("/user/info");
    } else {
      console.log(err);
    }
  });
};
