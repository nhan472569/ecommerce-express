const mongoose = require('mongoose');

var commentSchema = new mongoose.Schema({
  user: Object,
  productId: String,
  content: String,
  commentDate: String,
});
var Comment = mongoose.model('Comment', commentSchema, 'comments');

module.exports = Comment;
