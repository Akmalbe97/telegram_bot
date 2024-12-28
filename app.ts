import express from "express";
import cors from "cors";
import dotenv from "dotenv"
import bodyParser from "body-parser";
import connectDB from "./db/config";
// import authRouter from "./router/auth.routes";
// import errorHandler from "./middleware/error_middleware";
import { botFunction } from "./controller/telBot_ctr";
import telBotRouter from "./router/telBot_routes";

const app = express();
dotenv.config()

const PORT = process.env.PORT || 3000;

app.use(cors({
  credentials:true,
  origin: true
}))
app.use(express.urlencoded({extended: true}));
app.use(bodyParser.json())

///////////////DB connection
connectDB()
botFunction()
///////////////Routes
// app.use(authRouter)
app.use(telBotRouter)

////////////// Error
// app.use(errorHandler)

app.listen(PORT, () => {
  console.log("Server is running on the port " + PORT);
})

