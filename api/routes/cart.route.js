var express = require("express");

var controller = require("../controllers/cart.controller");

var router = express.Router();

router.get("/", controller.index);
router.get("/add/:productId", controller.add);
router.get("/delete/:cartProductId", controller.delete);
router.post("/order", controller.order);

module.exports = router;
