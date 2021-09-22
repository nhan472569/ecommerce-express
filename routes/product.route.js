const express = require("express");
var router = express.Router();
const productController = require("../controllers/product.controller");

router.get("/", productController.index);
router.get("/detail/:id", productController.detail);
router.post("/detail/comment/:id", productController.comment);
router.get("/search", productController.search);
router.get("/sort", productController.sort);
module.exports = router;
