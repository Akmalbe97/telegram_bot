import TelegramBot from "node-telegram-bot-api";
import telegramBotModel from "../schema/bot.schema";
import { NextFunction, Request, Response } from "express";
import BaseError from "../utils/base.error";

const botToken = "7634986429:AAFQX-Dttcch9iLO8vT9t732zfwqIgvyGak";
const bot = new TelegramBot(botToken as string, { polling: true });

bot.setMyCommands([
  {
    command: "/start",
    description: "Start bot",
  },
  {
    command: "/help",
    description: "Botni qo'llanmasi",
  },
  {
    command: "/exit",
    description: "Botni to'xtatish",
  },
]);

export function botFunction() {
  bot.on("message", async (msg) => {
    const chatId = msg.chat.id;
    if (msg.text === "/start") {
      bot.sendMessage(chatId, "Bot ishga tushdi");
    } else if (msg.text === "/help") {
      bot.sendMessage(
        msg.chat.id,
        `/start - Botni ishga tushurish 
        /help - qo'llanma`
      );
    } else {
      await telegramBotModel.create({
        first_name: msg.from?.first_name,
        sender_id: msg.from?.id,
        content: msg.text,
      });
      bot.sendMessage(
        chatId,
        `Assalomu alaykum ${msg.from?.first_name} Murojatingiz qabul qilindi!`
      );
    }
  });
}

export const getTodaysMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const messageOfToday = await telegramBotModel.find({
      date: { $gte: today },
    });

    if (!messageOfToday) {
      res.status(403).json({
        messages: [],
        message: "Bu vaqt oralig'ida Murojaatlar topilmadi",
      });
    }
    res.json({
      messages: messageOfToday,
    });
  } catch (error: any) {
    if (error.name === "validationError") {
      const errorMessage = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return next(BaseError.badRequest("validation error", errorMessage));
    }
    next(error);
  }
};

export const getTenDayMessages = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<Response | void> => {
  try {
    const today = new Date();
    const lastTenDay = new Date(today.setDate(today.getDate() - 10));

    const messageOfToday = await telegramBotModel.find({
      date: { $gte: lastTenDay },
    });

    if (!messageOfToday) {
      res.status(403).json({
        messages: [],
        message: "Bu vaqt oralig'ida Murojaatlar topilmadi",
      });
    }
    res.json({
      messages: messageOfToday,
    });
  } catch (error: any) {
    if (error.name === "validationError") {
      const errorMessage = Object.values(error.errors).map(
        (err: any) => err.message
      );
      return next(BaseError.badRequest("validation error", errorMessage));
    }
    next(error);
  }
};
