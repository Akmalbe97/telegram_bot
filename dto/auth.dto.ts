import {Document} from "mongoose";

export interface Auth extends Document {
  full_name: string,
  email: string,
  role: string,
  password:string
}