import { Request, Response } from "express";
import response from "../interfaces/response.interface";
import { blockUser } from "../interfaces/blockUser.interface";
// import { blockUserMember } from "../interfaces/blockUserMember.interface";
import {
  createBlockUserService,
  getBlockUserService,
  getBlockUserByBlockerService,
  deleteBlockUserService,
} from "../services/blockUser.service";

const createBlockUser = async (req: Request, res: Response) => {
  try {
    const newBlock: blockUser = req.body;
    const response: response = await createBlockUserService(newBlock);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getBlockUserByBlocker = async (req: Request, res: Response) => {
  try {
    const blocker: string = req.params.blocker;
    const response: response = await getBlockUserByBlockerService(blocker);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getBlockUser = async (req: Request, res: Response) => {
  try {
    const blocker: string = req.body.blocker;
    const blocked: string = req.body.blocked;
    const response: response = await getBlockUserService(blocker, blocked);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const deleteBlockUser = async (req: Request, res: Response) => {
  try {
    const blocker: string = req.params.blocker;
    const blocked: string = req.params.blocked;
    const response: response = await deleteBlockUserService(blocker, blocked);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

export default {
  createBlockUser,
  getBlockUserByBlocker,
  deleteBlockUser,
  getBlockUser,
};
