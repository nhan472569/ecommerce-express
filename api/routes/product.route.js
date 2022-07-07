var express = require('express');

var controller = require('../controllers/product.controller');

var router = express.Router();

router.get('/', controller.index);
router.get('/detail/:productID', controller.getProductByID);
router.get('/category', controller.getProductsByCategory);
router.get('/sort', controller.sort);
router.get('/search', controller.search);
router.get('/comment/:productID', controller.getComment);
router.post('/comment/:productID', controller.postComment);
router.get('/page', controller.pagination);

module.exports = router;
