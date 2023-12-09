"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b;
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const node_telegram_bot_api_1 = __importDefault(require("node-telegram-bot-api"));
const axios_1 = __importDefault(require("axios"));
require("dotenv/config");
const comands_1 = require("./comands");
const messages_1 = require("./messages");
const app = (0, express_1.default)();
const botToken = (_a = process.env.TELEGRAM_TOKEN) !== null && _a !== void 0 ? _a : "";
const mcServerAPI = (_b = process.env.MC_SERVER_API) !== null && _b !== void 0 ? _b : "";
const bot = new node_telegram_bot_api_1.default(botToken, { polling: true });
bot.on("message", (msg) => __awaiter(void 0, void 0, void 0, function* () {
    const chatId = msg.chat.id;
    const messageText = msg.text ? msg.text : "";
    switch (messageText) {
        case comands_1.HELP_COMMAND: {
            bot.sendMessage(chatId, messages_1.HELP_MESSAGE);
            break;
        }
        case comands_1.START_COMMAND: {
            bot.sendMessage(chatId, messages_1.START_MESSAGE);
            break;
        }
        case comands_1.PLAYERS_COMMAND: {
            try {
                const response = yield axios_1.default.get(mcServerAPI);
                if (response.data &&
                    response.data.players &&
                    response.data.players.now) {
                    const players = response.data.players;
                    bot.sendMessage(chatId, (0, messages_1.getPlayerInfoMessage)(players));
                }
                else {
                    bot.sendMessage(chatId, messages_1.EMPTY_SERVER_MESSAGE);
                }
            }
            catch (error) {
                bot.sendMessage(chatId, messages_1.ERROR_MESSAGE);
                console.error("Error:", error);
            }
            break;
        }
        case comands_1.SEX_COMMAND: {
            try {
                const response = yield axios_1.default.get(mcServerAPI);
                if (response.data &&
                    response.data.players &&
                    response.data.players.now) {
                    const players = response.data.players;
                    bot.sendMessage(chatId, (0, messages_1.getSexMessage)(players));
                }
                else {
                    bot.sendMessage(chatId, messages_1.EMPTY_SERVER_MESSAGE);
                }
            }
            catch (error) {
                bot.sendMessage(chatId, messages_1.ERROR_MESSAGE);
                console.error("Error:", error);
            }
            break;
        }
        default: {
            bot.sendMessage(chatId, messages_1.UNKNOWN_COMMAND_MESSAGE);
            break;
        }
    }
})
//   if (messageText === "/start") {
//     bot.sendMessage(chatId, START_MESSAGE);
//   } else if (messageText === "/players") {
//     try {
//       const response: AxiosResponse<ResponseData> = await axios.get(
//         mcServerAPI
//       );
//       if (response.data && response.data.players && response.data.players.now) {
//         const playerCount = response.data.players.now;
//         bot.sendMessage(
//           chatId,
//           `There are currently ${playerCount} players online.`
//         );
//       } else {
//         bot.sendMessage(
//           chatId,
//           "Unable to retrieve player information at the moment."
//         );
//       }
//     } catch (error) {
//       bot.sendMessage(
//         chatId,
//         "Error occurred while fetching player information."
//       );
//       console.error("Error:", error);
//     }
//   } else {
//     bot.sendMessage(chatId, "I cannot understand this command.");
//   }
);
const PORT = process.env.PORT || 3000;
app.get("/", (req, res) => {
    res.send("Telegram bot is running.");
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
