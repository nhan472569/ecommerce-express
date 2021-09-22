const express = require("express");
var router = express.Router();
const cartController = require("../controllers/cart.controller");

router.get("/", cartController.index);
router.get("/add/:productId", cartController.create);
router.get("/delete/:cartProductId", cartController.delete);

module.exports = router;
