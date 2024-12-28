import { Router, RequestHandler} from "express";
import { getTenDayMessages, getTodaysMessages } from "../controller/telBot_ctr";

const telBotRouter:Router = Router()

telBotRouter.get("/get_today_messages", getTodaysMessages as RequestHandler)
telBotRouter.get("/get_ten_day_messages", getTenDayMessages as RequestHandler)

export default telBotRouter