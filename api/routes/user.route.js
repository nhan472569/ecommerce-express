const express = require("express");
var router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/info", userController.getUser);
// router.post("/info", userController.updateUser);

module.exports = router;
