const mongoose = require("mongoose");

var commentSchema = new mongoose.Schema({
  userName: String,
  productId: String,
  content: String,
});
var Comment = mongoose.model("Comment", commentSchema, "comments");

module.exports = Comment;
