import jwt from "jsonwebtoken";
import {Request, Response, NextFunction} from "express";

declare global {
  namespace Express {
    interface Request {
      user?: {
        id: string;
        email: string;
        role: string;
      };
    }
  }
}
export const checkAdmin = async (req: Request, res:Response, next: NextFunction) => {
  const token = req.headers.authorization?.split(" ")[1]
  if(!token) {
    return res.status(400).send({message: "invalid token"})
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET || "defaultsecret") as {
      id: string;
      email: string;
      role: string;
    };
    req.user = decoded;

    if (decoded.role !== "admin") {
      return res.json({
        message: "You are not admin"
      });
    }
    next()
  } catch (err:any){
    console.error(err.message)
    return res.status(403).json({ message: "Invalid or expired token." });
  }
};
