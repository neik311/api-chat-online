import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { Request, Response, NextFunction } from "express";

dotenv.config();

const authUser = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const accessToken: any = req.headers.access_token;
    console.log(accessToken);
    const id =
      req.body?.id ||
      req.body?.sender ||
      req.body?.blocker ||
      req.params.blocker;
    if (!accessToken) {
      res
        .status(200)
        .json({ statusCode: "411", message: "không thể xác thực" });
      return;
    }
    let key = process.env.JWT_SECRET || "";
    const decoded: any = jwt.verify(accessToken, key);
    if (decoded?.rule === "admin") {
      next();
      return;
    }
    if (decoded?.id !== id) {
      res.status(200).json({ statusCode: "412", message: "sai tài khoản" });
      return;
    }
    next();
  } catch (error) {
    res.status(200).json({ statusCode: "410", message: `${error}` });
  }
};

export { authUser };
