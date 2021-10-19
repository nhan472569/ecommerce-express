const mongoose = require("mongoose");

var userSchema = new mongoose.Schema({
  email: String,
  password: String,
  firstName: String,
  lastName: String,
  address: String,
  phoneNumber: String,
  avatar: String,
});
var User = mongoose.model("User", userSchema, "users");

module.exports = User;
