const { Router } = require("express");
const express = require("express");
var router = express.Router();
const productController = require("../controllers/product.controller");

router.get("/", productController.index);
router.get("/:id", productController.detail);

module.exports = router;
