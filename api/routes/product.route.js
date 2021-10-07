var express = require("express");

var controller = require("../controllers/product.controller");

var router = express.Router();

router.get("/", controller.index);
router.get("/detail/:productID", controller.getProductByID);
router.get("/sort", controller.sort);
router.get("/search", controller.search);

module.exports = router;
