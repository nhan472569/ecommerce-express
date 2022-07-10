var express = require('express');

var controller = require('../controllers/author.controller');

var router = express.Router();

router.get('/:authorId', controller.findAuthorById);

module.exports = router;
