const UserInfo = require("../models/userInfo");
const UserAnswer = require("../models/userAnswer");
const { SolapiMessageService } = require("solapi");
const dotenv = require("dotenv");
dotenv.config();
const baseUrl = process.env.BASE_URL;

const messageService = new SolapiMessageService(
  process.env.API_KEY,
  process.env.API_SECRET
);

exports.saveUserInfoAndSend = async (req, res) => {
  const { name, tel, answerId } = req.body;
  console.log("saveUserInfoAndSend 호출됨", name, tel, answerId);

  // 배포후에 배포용 주소로 변경예정
  // const url = `http://localhost:8080/result/${answerId}`;
  const answerData = await UserAnswer.findById(answerId);
  const url = `${baseUrl}/result/${answerData.result.resultId}`;

  // const url = "www.naver.com";

  const url2 = "thesooltourism.com/";
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
    console.log(`==============${url}`);
    const response = await messageService.send({
      to: tel,
      from: process.env.SOLAPI_PHONE,
      kakaoOptions: {
        pfId: process.env.SOLAPI_PFID,
        templateId: process.env.SOLAPI_TEMPLATE_ID,
        variables: {
          "#{name}": name,
          "#{title}": answerData.result.title,
          "#{desc}": answerData.result.desc,
          "#{url}": url,
          "#{url2}": url2,
        },
        disableSms: false,
      },
    });
    // console.log("📦 Solapi 응답:", response);

    res.json({
      success: true,
      id: saved._id,
      message: "알림톡 전송 완료",
      data: response,
      result: answerData.result,
    });
  } catch (err) {
    console.error("❌ 알림톡 전송 실패:", err);
    res.status(500).json({ success: false, message: "전송 실패" });
  }
};
