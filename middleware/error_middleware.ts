import { Request, Response, NextFunction } from "express";
import BaseError from "../utils/base.error";

const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof BaseError) {
    return res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
  }

  res.status(500).json({
    message: "Internal server error",
  });
};

export default errorHandler;
