const express = require("express");

const { loginUser, verifyToken, getUserById } = require("../controllers/userController");

const router = express.Router();

router.post("/login", verifyToken, loginUser);
module.exports = router;