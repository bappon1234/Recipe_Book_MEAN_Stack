const express = require("express");
const router = express.Router();

const {login, register, getUserProfile} = require("../controller/userController");

router.post("/register", register);
router.post("/login", login);
router.get('/getUserProfile', getUserProfile)

module.exports = router;