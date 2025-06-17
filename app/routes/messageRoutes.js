// messageRoutes.js

console.log("📂 messageRoutes 라우터 로딩됨");

const express = require("express");
const router = express.Router();
const userInfoController = require("../controllers/userInfoController");

router.post("/send-message", userInfoController.saveUserInfoAndSend);

module.exports = router;
