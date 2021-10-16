const mongoose = require("mongoose");
const User = require("./user.model");

var commentSchema = new mongoose.Schema({
  user: Object,
  productId: String,
  content: String,
  commentDate: String,
});
var Comment = mongoose.model("Comment", commentSchema, "comments");

module.exports = Comment;
