const User = require("../../models/user.model");
const Comment = require("../../models/comment.model");
const cloudinary = require("../../utils/cloudinary");

module.exports.getUser = async function (req, res) {
  const userId = req.query.userID;
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

module.exports.updateUser = async function (req, res) {
  const userId = req.body.userID;
  if (!userId) {
    res.json({
      message: "Vui lòng đăng nhập",
      status: false,
    });
  }

  try {
    User.updateOne(
      { _id: userId },
      { $set: req.body },
      async function (err, result) {
        if (err) {
          res.send(err);
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
                res.send(err);
              } else {
                res.json(user);
              }
            }
          );
        }
      }
    );
  } catch (err) {
    res.send(err);
  }
};
