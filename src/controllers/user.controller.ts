import { Request, Response } from "express";
import response from "../interfaces/response.interface";
import { user } from "../interfaces/user.interface";
import {
  createUserService,
  loginService,
  loginByTokenService,
  getUserByIdService,
  getUserByEmailService,
  updateUserService,
} from "../services/user.service";
// import dotenv from "dotenv";
// dotenv.config();

const createUser = async (req: Request, res: Response) => {
  try {
    const newUser: user = req.body;
    const response: response = await createUserService(newUser);
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
    const id: any = req.query.id;
    const email: any = req.query.email;
    if (id) {
      const response: response = await getUserByIdService(id);
      res.status(200).json(response);
      return;
    }
    const response: response = await getUserByEmailService(email);
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

export default {
  createUser,
  login,
  loginByToken,
  getUser,
  updateUser,
};
