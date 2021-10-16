const express = require("express");
var router = express.Router();
const authController = require("../controllers/auth.controller");

router.get("/login", authController.login);
router.post("/login", authController.postLogin);

router.get("/register", authController.register);
router.post("/register", authController.postRegister);

router.get("/logout", authController.logout);

module.exports = router;
