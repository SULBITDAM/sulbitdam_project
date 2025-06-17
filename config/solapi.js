const { SolapiMessageService } = require("solapi");
const dotenv = require("dotenv");
dotenv.config();

const api_key = process.env.API_KEY || "";
const api_secret = process.env.API_SECRET || "";

const messageService = new SolapiMessageService(api_key, api_secret);
module.exports = messageService;
