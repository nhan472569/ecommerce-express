const Author = require('../../models/author.model');

module.exports.findAuthorById = async (req, res) => {
  const authorId = req.params.authorId;
  await Author.findById(authorId).exec((err, author) => {
    if (err) return res.status(400).json(err);
    return res.status(200).json(author);
  });
};
