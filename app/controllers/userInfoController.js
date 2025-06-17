const UserInfo = require("../models/userInfo");
const UserAnswer = require("../models/userAnswer");
const { SolapiMessageService } = require("solapi");
const dotenv = require("dotenv");
dotenv.config();

const messageService = new SolapiMessageService(
  process.env.API_KEY,
  process.env.API_SECRET
);

exports.saveUserInfoAndSend = async (req, res) => {
  const { name, tel, answerId } = req.body;
  console.log("함수 실행됨!");

  // 배포후에 배포용 주소로 변경예정
  //   const url = `http://localhost:8080/result/${answerId}`;
  const baseUrl = process.env.BASE_URL || "http://localhost:8080";
  const url = `${baseUrl}/result/${answerId}`;

  //   const url = "www.naver.com";
  try {
    const answerData = await UserAnswer.findById(answerId);
    if (!answerData)
      return res
        .status(404)
        .json({ success: false, message: "설문 결과 없음" });

    const saved = await UserInfo.create({
      name,
      tel,
      answerId,
    });
    console.log(url);
    const response = await messageService.send({
      to: tel,
      from: process.env.SOLAPI_PHONE,
      kakaoOptions: {
        pfId: process.env.SOLAPI_PFID,
        templateId: process.env.SOLAPI_TEMPLATE_ID,
        variables: {
          "#{name}": name,
          "#{text}": answerData.result.title,
          "#{url}": url,
        },
        disableSms: false,
      },
    });
    console.log("📦 Solapi 응답:", response);
    res.json({
      success: true,
      id: saved._id,
      message: "알림톡 전송 완료",
      data: response,
    });
  } catch (err) {
    console.error("❌ 알림톡 전송 실패:", err);
    res.status(500).json({ success: false, message: "전송 실패" });
  }
};
