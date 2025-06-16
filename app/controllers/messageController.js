const messageService = require("../../config/solapi");

exports.sendKakaoMessage = async (req, res) => {
  const { name, text, tel, btn_url, disableSms } = req.body;

  try {
    const response = await messageService.send({
      to: tel,
      from: process.env.SOLAPI_PHONE,
      kakaoOptions: {
        pfId: process.env.SOLAPI_PFID,
        templateId: process.env.SOLAPI_TEMPLATE_ID,
        variables: {
          "#{name}": name,
          "#{text}": text,
          "#{url}": btn_url,
        },
        disableSms: disableSms || false,
      },
    });

    res.json({
      success: true,
      message: "알림톡 전송 성공",
      data: response,
    });
  } catch (error) {
    res.json({
      success: false,
      message: error.message,
      error: error.response?.status === 401 ? "인증실패" : "메시지 전송 실패",
    });
  }
};

exports.submitSurvey = async (req, res) => {
  const { name, tel, result } = req.body;

  try {
    const saved = await require("../models/messageModel").saveSurveyResult({
      name,
      tel,
      result,
    });
    res.json({ success: true, data: saved });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
