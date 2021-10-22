const express = require("express");
const upload = require("../../utils/multer");
const router = express.Router();
const userController = require("../controllers/user.controller");

router.get("/info", userController.getUser);
router.post("/info", upload.single("avatar"), userController.updateUser);

module.exports = router;
