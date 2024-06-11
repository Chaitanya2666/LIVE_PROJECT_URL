const express = require("express");
const { handleLogin, handleLoginCheck } = require("../controllers/login");
const router = express.Router();

router.post("/", handleLogin);
router.post("/login", handleLoginCheck);
module.exports = router;
