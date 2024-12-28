// import authModel from "../schema/authschema";
// import { Request, Response, NextFunction } from "express";
// import bcrypt from "bcrypt";
// import jwt from "jsonwebtoken"
// import BaseError from "../utils/base.error";
// // import redisClient from "../config/redis"

// ////register

// export const register = async (req:Request, res:Response, next: NextFunction) => {
//   try{
//     const {full_name, email, role, password}: {full_name: string, email: string, role:string, password: string} = req.body
//     const foundUser = await authModel.findOne({email})

//     if(foundUser) {
//      return res.status(400).json({message: "User alredy exist"})
//     }

//     const hash = await bcrypt.hash(password, 12)
//     await authModel.create({full_name, email, role, password:hash})

//     res.status(201).json({
//       message: "user registered"
//     })
//   }catch(error: any) {
//     if(error.name === "validationError") {
//       const errorMessage = Object.values(error.errors).map((err: any) => err.message)      
//       return next(BaseError.badRequest("validation error", errorMessage))
//     }
//     next(error)
//   }
// } 

// //// login

// export const login = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const {email, password}: {email: string, password: string} = req.body
//     const foundUser = await authModel.findOne({email}) 
    
//     if(!foundUser) {
//      return res.status(400).json({message: "User not found"})
//     }

//     const isMatch = await bcrypt.compare(password, foundUser.password);

//     if(!isMatch) {
//      return res.status(404).json({message: "Invalid password"})
//     }

//     const token = jwt.sign({id: foundUser._id, email: foundUser.email, role: foundUser.role}, process.env.JWT_SECRET || "defaultsecret", {expiresIn: "1d"})

//     res.status(200).json({
//       message: "login successfully",
//       token
//     })
//   } catch (error: any) {
//     console.error(error.message);
//     return res.status(500).json({message: "Internal server error", error: error.message})
//   }
// }

// //// logout

// export const logOut = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const token = req.headers.authorization?.split(" ")[1];

//     if (!token) {
//       return res.status(400).json({ message: "Token not found" });
//     }

//     const decodedToken = jwt.decode(token) as { exp: number };
//     const expiry = decodedToken?.exp || 3600; 

//     await redisClient.set(token, "blacklisted", { EX: expiry });

//     res.status(200).json({
//       message: "Successfully logged out",
//     });
//   } catch (error: any) {
//     console.error("Logout error:", error.message);
//     next(error);
//   }
// };
