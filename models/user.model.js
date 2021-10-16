const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  avatar: String,
});
var User = mongoose.model("User", userSchema, "user");

module.exports = User;
