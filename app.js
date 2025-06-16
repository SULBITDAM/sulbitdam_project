const express = require("express");
const app = express();
require("dotenv").config();

const connectDB = require("./config/mongo");
connectDB();

const surveyRoutes = require("./app/routes/surveyRoutes");

app.use(express.json());
app.use("/", surveyRoutes); // ← 라우터 등록!

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
