const cloudinary = require("../utils/cloudinary");
const User = require("../models/user.model");
const Session = require("../models/session.model");
const Comment = require("../models/comment.model");

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

module.exports.updateUser = async function (req, res) {
  const userId = req.signedCookies.userId;

  try {
    // Upload image to cloudinary
    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path);
      // Create new user
      req.body.avatar = result.secure_url;
    }
    User.updateOne(
      { _id: userId },
      { $set: req.body },
      async function (err, result) {
        if (err) {
          console.log(err);
        } else {
          const user = await User.findById(userId);
          const email = user.email;
          Comment.updateMany(
            { "user.email": email },
            {
              $set: {
                user: user,
              },
            },
            function (err, result) {
              if (err) {
                console.log(err);
              } else {
                res.redirect("/user/info");
              }
            }
          );
        }
      }
    );
  } catch (err) {
    console.log(err);
  }
};
