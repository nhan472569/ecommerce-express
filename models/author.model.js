const mongoose = require('mongoose');

var authorSchema = new mongoose.Schema({
  name: String,
  image: String,
  introduction: String,
});
var Author = mongoose.model('Author', authorSchema, 'authors');

module.exports = Author;
