const express = require("express");
const path = require("path");
const router = express.Router();
const UserAnswer = require("../models/userAnswer");
const userAnswerController = require("../controllers/userAnswerController"); // ✅ 추가

// index.html
router.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "../../views/index.html"));
});

// survey.html
router.get("/survey", (req, res) => {
  res.sendFile(path.join(__dirname, "../../views/survey.html"));
});

// consent.html
router.get("/consent", (req, res) => {
  res.sendFile(path.join(__dirname, "../../views/consent.html"));
});

// ✅ HTML 페이지는 따로 서빙
router.get("/result/:id", (req, res) => {
  res.sendFile(path.join(__dirname, "../../views/result.html"));
});

/// ✅ API는 json만 응답
router.get("/api/result/:id", async (req, res) => {
  try {
    const result = await UserAnswer.findById(req.params.id);
    if (!result) return res.status(404).json({ message: "결과 없음" });
    res.json(result);
  } catch (e) {
    res.status(500).json({ message: "서버 에러" });
  }
});
// ✅ [추가] 설문 답변 저장 API
router.post("/api/save-answer", userAnswerController.saveAnswer);

module.exports = router;
