import { Request, Response } from "express";
import { v4 as uuidV4 } from "uuid";
import path from "path";
import response from "../interfaces/response.interface";
import { user } from "../interfaces/user.interface";
import { verify } from "../interfaces/verify.interface";
import {
  createUserService,
  loginService,
  loginByTokenService,
  getUserService,
  updateUserService,
  verifyUserService,
} from "../services/user.service";
import { sendVerificationEmail } from "../utils/sendEmail";
import {
  createVerifyService,
  deleteVerifyService,
  getVerifyService,
} from "../services/verify.service";
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

const updateUser = async (req: Request, res: Response) => {
  try {
    const newUser: user = req.body;
    const response: response = await updateUserService(newUser);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getUser = async (req: Request, res: Response) => {
  try {
    const id: any = req.query.id || "";
    const email: any = req.query.email || "";
    // if (id) {
    //   const response: response = await getUserByIdService(id);
    //   res.status(200).json(response);
    //   return;
    // }
    // const response: response = await getUserByEmailService(email);
    const response: response = await getUserService(id, email);
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
    const token: string = req.body.token;
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
    res.status(200).json({ statusCode: "200", message: "send email success" });
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
      const message =
        "Account record doesn't exist or has been verified already. Please sign";
      res.redirect(`/user/verified?error=true&message=${message}`);
      return;
    }
    if (
      foundVerify.createAt.getTime() + foundVerify.effectiveSeconds * 1000 <
      new Date().getTime()
    ) {
      const message = "Link has expired. Please sign up again";
      res.redirect(`/user/verified?error=true&message=${message}`);
      return;
    }
    await deleteVerifyService(email);
    await verifyUserService(email);
    res.redirect(`/user/verified`);
  } catch (error) {
    console.log(error);
    const message =
      "An error occurred while checking for existing user verification";
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
  updateUser,
  sendMail,
  verifyEmail,
  verified,
};
