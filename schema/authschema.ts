import mongoose, { Schema } from "mongoose"
import { Auth } from "../dto/auth.dto"

const authSchema = new Schema<Auth>({
  full_name: {
    type: String,
    required: [true,"full_name is requared"],
    minlength: [3, "minimum length is 3 characters"],
    maxlength:[50,"maximum length is 50 characters"]
  },
  email:{
    type: String,
    required: [true,"email is requared"],
  },
  role: {
    type:String,
    enum: ["admin", "user", "superadmin"],
    required: [true,"role is requared"],
  },
  password: {
    type: String,
    required: [true,"password is requared"],
  }
})

const authModel = mongoose.model<Auth>("auth", authSchema)

export default authModel