const express = require("express");
const path = require("path");
const router = express.Router();
const SurveyResult = require("../models/surveyResult");

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

router.get("/result/:id", async (req, res) => {
  try {
    const result = await SurveyResult.findById(req.params.id);
    if (!result) return res.status(404).send("결과 없음");

    res.sendFile(path.join(__dirname, "../../views/result.html"));
  } catch (e) {
    res.status(500).send("에러 발생");
  }
});

router.get("/api/result/:id", async (req, res) => {
  try {
    const result = await SurveyResult.findById(req.params.id);
    if (!result) return res.status(404).json({ message: "결과 없음" });
    res.json(result);
  } catch (e) {
    res.status(500).json({ message: "서버 에러" });
  }
});

router.get("/result", (req, res) => {
  res.sendFile(path.join(__dirname, "../../views/result.html"));
});

module.exports = router;
