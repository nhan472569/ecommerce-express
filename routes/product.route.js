const express = require("express");
var router = express.Router();
const productController = require("../controllers/product.controller");

router.get("/", productController.index);
router.get("/detail/:id", productController.detail);
router.get("/search", productController.search);

module.exports = router;
