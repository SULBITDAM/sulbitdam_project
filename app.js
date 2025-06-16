const express = require("express");
const app = express();
require("dotenv").config();

const messageRoutes = require("./app/routes/messageRoutes");

app.use(express.json());
app.use("/api", messageRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`🚀 서버 실행 중: http://localhost:${PORT}`);
});
