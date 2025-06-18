const SurveyResult = require("../models/surveyResult");
const { SolapiMessageService } = require("solapi");
const messageService = new SolapiMessageService(
  process.env.API_KEY,
  process.env.API_SECRET
);

exports.sendMessage = async (req, res) => {
  const { name, phone, answers } = req.body;

  try {
    // 1. DB 저장
    const result = await SurveyResult.create({ name, phone, answers });

    // 2. 알림톡 발송
    await messageService.send({
      to: phone,
      from: process.env.SOLAPI_PHONE,
      kakaoOptions: {
        pfId: process.env.SOLAPI_PFID,
        templateId: process.env.SOLAPI_TEMPLATE_ID,
        variables: {
          "#{name}": name,
          "#{text}": "전통주 테스트 결과를 확인하세요!",
          "#{url}": `http://localhost:8080/result/${result._id}`,
        },
      },
    });

    res.json({ success: true, id: result._id }); // result 페이지에서 쓸 ID 응답
  } catch (e) {
    console.error("전송 실패", e);
    res.status(500).json({ success: false, message: "전송 실패" });
  }
};
