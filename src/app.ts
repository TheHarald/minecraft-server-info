import express from "express";
import TelegramBot from "node-telegram-bot-api";
import axios, { AxiosResponse } from "axios";
import "dotenv/config";
import { ResponseData } from "./types";
import {
  HELP_COMMAND,
  PLAYERS_COMMAND,
  SEX_COMMAND,
  START_COMMAND,
} from "./comands";
import {
  EMPTY_SERVER_MESSAGE,
  ERROR_MESSAGE,
  HELP_MESSAGE,
  START_MESSAGE,
  UNKNOWN_COMMAND_MESSAGE,
  getPlayerInfoMessage,
  getSexMessage,
} from "./messages";

const app = express();
const botToken = process.env.TELEGRAM_TOKEN ?? "";
const mcServerAPI = process.env.MC_SERVER_API ?? "";

const bot = new TelegramBot(botToken, { polling: true });

bot.on("message", async (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text ? msg.text : "";

  switch (messageText) {
    case HELP_COMMAND: {
      bot.sendMessage(chatId, HELP_MESSAGE);
      break;
    }
    case START_COMMAND: {
      bot.sendMessage(chatId, START_MESSAGE);
      break;
    }

    case PLAYERS_COMMAND: {
      try {
        const response: AxiosResponse<ResponseData> = await axios.get(
          mcServerAPI
        );
        if (
          response.data &&
          response.data.players &&
          response.data.players.now
        ) {
          const players = response.data.players;
          bot.sendMessage(chatId, getPlayerInfoMessage(players));
        } else {
          bot.sendMessage(chatId, EMPTY_SERVER_MESSAGE);
        }
      } catch (error) {
        bot.sendMessage(chatId, ERROR_MESSAGE);
        console.error("Error:", error);
      }
      break;
    }

    case SEX_COMMAND: {
      try {
        const response: AxiosResponse<ResponseData> = await axios.get(
          mcServerAPI
        );
        if (
          response.data &&
          response.data.players &&
          response.data.players.now
        ) {
          const players = response.data.players;
          bot.sendMessage(chatId, getSexMessage(players));
        } else {
          bot.sendMessage(chatId, EMPTY_SERVER_MESSAGE);
        }
      } catch (error) {
        bot.sendMessage(chatId, ERROR_MESSAGE);
        console.error("Error:", error);
      }
      break;
    }

    default: {
      if (messageText[0] === "/")
        bot.sendMessage(chatId, UNKNOWN_COMMAND_MESSAGE);
      break;
    }
  }
});

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Telegram bot is running.");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
