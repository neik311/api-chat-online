import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import path from "path";
import response from "../interfaces/response.interface";
import { user } from "../interfaces/user.interface";
import { verify } from "../interfaces/verify.interface";
import { forgotPassword } from "../interfaces/forgotPassword.interface";
import {
  createUserService,
  loginService,
  loginByTokenService,
  getUserService,
  getAllUserService,
  updateUserService,
  verifyUserService,
  changePasswordUserService,
  lockUserService,
} from "../services/user.service";
import {
  sendVerificationEmail,
  sendVerifiForgotPassword,
} from "../utils/sendEmail";
import {
  createVerifyService,
  deleteVerifyService,
  getVerifyService,
} from "../services/verify.service";
import {
  createVerifyPasswordService,
  deleteVerifyPasswordService,
  getVerifyPasswordService,
} from "../services/forgotPassword.service";
// import dotenv from "dotenv";
// dotenv.config();

const createUser = async (req: Request, res: Response) => {
  try {
    const newUser: user = req.body;
    const response: response = await createUserService(newUser);
    if (response.statusCode === "200") {
      const uniqueString = uuidV4();
      await sendVerificationEmail(newUser.email, uniqueString);
      const newVerify: any = {
        email: newUser.email,
        uniqueString: uniqueString,
      };
      await createVerifyService(newVerify);
    }
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const createForgotPassword = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const response: response = await getUserService("", email);
    if (!response.data) {
      res
        .status(200)
        .json({ statusCode: "400", message: "Tài khoản không tồn tại" });
      return;
    }
    const uniqueString = uuidV4();
    await sendVerifiForgotPassword(email, uniqueString);
    const newVerify: any = {
      email: email,
      uniqueString: uniqueString,
      password: password,
    };
    await createVerifyPasswordService(newVerify);
    res.status(200).json({ statusCode: "200", message: "Tạo thành công" });
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const updateUser = async (req: Request, res: Response) => {
  try {
    const newUser: user = req.body;
    const response: response = await updateUserService(newUser);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const lockUser = async (req: Request, res: Response) => {
  try {
    const { email, lock } = req.body;
    const response: response = await lockUserService(email, lock);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const id: any = req.query.id || "";
    const email: any = req.query.email || "";
    const response: response = await getUserService(id, email);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getAllUser = async (_req: Request, res: Response) => {
  try {
    const response: response = await getAllUserService();
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const login = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;
    const response: response = await loginService(email, password);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const loginByToken = async (req: Request, res: Response) => {
  try {
    const token: string = req.body.refreshToken;
    const response: response = await loginByTokenService(token);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const sendMail = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const uniqueString = uuidV4();
    await sendVerificationEmail(email, uniqueString);
    res
      .status(200)
      .json({ statusCode: "200", message: "gửi email thành công" });
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const verifyEmail = async (req: Request, res: Response) => {
  try {
    const email: string = req.params.email;
    const uniqueString: string = req.params.uniqueString;
    const foundVerify: verify | null = (
      await getVerifyService(email, uniqueString)
    ).data;
    if (!foundVerify) {
      const message = "Tài khoản không tồn tại hoặc đã được xác minh";
      res.redirect(`/user/verified?error=true&message=${message}`);
      return;
    }
    if (
      foundVerify.createAt.getTime() + foundVerify.effectiveSeconds * 1000 <
      new Date().getTime()
    ) {
      const message = "Liên kết đã hết hạn, vui lòng đăng ký lại";
      res.redirect(`/user/verified?error=true&message=${message}`);
      return;
    }
    await deleteVerifyService(email);
    await verifyUserService(email);
    res.redirect(`/user/verified`);
  } catch (error) {
    console.log(error);
    const message = "Đã xảy ra lỗi khi kiểm tra xác minh người dùng hiện tại";
    res.redirect(`/user/verified?error=true&message=${message}`);
  }
};

const verifyChangePassword = async (req: Request, res: Response) => {
  try {
    const email: string = req.params.email;
    const uniqueString: string = req.params.uniqueString;
    const foundVerify: forgotPassword | null = (
      await getVerifyPasswordService(email, uniqueString)
    ).data;
    if (!foundVerify) {
      const message = "Tài khoản không tồn tại hoặc đã được xác minh";
      res.redirect(`/user/verified?error=true&message=${message}`);
      return;
    }
    if (
      foundVerify.createAt.getTime() + foundVerify.effectiveSeconds * 1000 <
      new Date().getTime()
    ) {
      const message = "Liên kết đã hết hạn, vui lòng đăng ký lại";
      res.redirect(`/user/verified?error=true&message=${message}`);
      return;
    }
    await deleteVerifyPasswordService(email);
    await changePasswordUserService(email, foundVerify.password);
    res.redirect(`/user/verified`);
  } catch (error) {
    console.log(error);
    const message = "Đã xảy ra lỗi khi kiểm tra xác minh người dùng hiện tại";
    res.redirect(`/user/verified?error=true&message=${message}`);
  }
};

const verified = (_req: Request, res: Response) => {
  try {
    console.log(__dirname);
    res.sendFile(path.join(__dirname, "./../views/verified.html"));
  } catch (error) {
    console.log(error);
  }
};

export default {
  createUser,
  login,
  loginByToken,
  getUser,
  getAllUser,
  updateUser,
  sendMail,
  verifyEmail,
  verified,
  createForgotPassword,
  verifyChangePassword,
  lockUser,
};
