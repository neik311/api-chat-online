import { Request, Response } from "express";
import response from "../interfaces/response.interface";
import { messages } from "../interfaces/messages.interface";
import {
  createMessagesService,
  getMessagesInGroupService,
  deleteMessagesInGroupService,
} from "../services/messages.service";

const createMessaes = async (req: Request, res: Response) => {
  try {
    const newMessages: messages = req.body;
    const response: response = await createMessagesService(newMessages);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getMessagesInGroup = async (req: Request, res: Response) => {
  try {
    const groupId: number = Number(req.params.groupId);
    const response: response = await getMessagesInGroupService(groupId);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const deleteMessagesInGroup = async (req: Request, res: Response) => {
  try {
    const messagesId: string = req.body.messagesId;
    const response: response = await deleteMessagesInGroupService(messagesId);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

export default {
  createMessaes,
  getMessagesInGroup,
  deleteMessagesInGroup,
};
