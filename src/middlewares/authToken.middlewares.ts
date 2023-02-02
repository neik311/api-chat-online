import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const authAdmin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      res
        .status(200)
        .json({ statusCode: "400", message: "can't authenticate" });
      return;
    }
    let key = process.env.JWT_SECRET || "";
    const decoded: any = jwt.verify(authorizationHeader, key);
    if (decoded?.rule !== "admin") {
      res
        .status(200)
        .json({ statusCode: "400", message: "can't authenticate" });
      return;
    }
    next();
  } catch (error) {
    console.log("error ", error);
    res.status(200).json({ statusCode: "400", message: "can't authenticate" });
  }
};

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorizationHeader = req.headers.authorization;
    if (!authorizationHeader) {
      res
        .status(200)
        .json({ statusCode: "400", message: "can't authenticate" });
      return;
    }
    let key = process.env.JWT_SECRET || "";
    const decoded: any = jwt.verify(authorizationHeader, key);
    if (decoded?.id !== req.body.id) {
      res.status(200).json({ statusCode: "400", message: "wrong account" });
      return;
    }
    next();
  } catch (error) {
    console.log("error ", error);
    res.status(200).json({ statusCode: "400", message: "can't authenticate" });
  }
};

export { authAdmin, authUser };
