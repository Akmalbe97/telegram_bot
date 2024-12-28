import mongoose, {model, Schema} from "mongoose";
import { ITelegram } from "../dto/telegram.dto";

export const telegramBotSchema  = new Schema<ITelegram>({
  first_name: {
    type: String,
    required: true
  },
  sender_id: {
    type: Number,
  },
  content: {
    type: String
  },
  date: {
    type: Date,
    default: Date.now
  }
})

const telegramBotModel = model<ITelegram>("telegramBotModel", telegramBotSchema);
export default telegramBotModel