const express = require("express");
const router = express.Router();

const messageController = require("../controllers/messageController"); // ✅ 전체 객체 불러오기

router.post("/send-message", messageController.sendMessage); // ✅ 함수 연결

module.exports = router;
