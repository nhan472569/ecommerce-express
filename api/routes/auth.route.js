var express = require("express");

var controller = require("../controllers/auth.controller");

var router = express.Router();

router.post("/login", controller.login);
router.post("/register", controller.register);

module.exports = router;
