var User = require("../models/user.model");

module.exports.requireAuth = function (req, res, next) {
  if (!req.signedCookies.userId) {
    res.redirect("/auth/login");
    return;
  }

  var user = User.findById(req.signedCookies.userId);

  if (!user) {
    res.redirect("/auth/login");
    return;
  }

  res.locals.user = user;

  next();
};
