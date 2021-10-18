var express = require("express");

var controller = require("../controllers/cart.controller");

var router = express.Router();

router.get("/", controller.index);
router.post("/", controller.add);
router.delete("/:productID", controller.delete);

module.exports = router;
