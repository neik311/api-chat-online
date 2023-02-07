import { Request, Response } from "express";
import response from "../interfaces/response.interface";
import { group } from "../interfaces/group.interface";
// import { groupMember } from "../interfaces/groupMember.interface";
import {
  createGroupService,
  getGroupByUserService,
  updateIsDeleteGroupService,
  getGroupService,
} from "../services/group.service";

const createGroup = async (req: Request, res: Response) => {
  try {
    const newGroup: group = req.body;
    const response: response = await createGroupService(newGroup);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getGroupByUser = async (req: Request, res: Response) => {
  try {
    const userId: string = req.params.userId;
    const response: response = await getGroupByUserService(userId);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const getGroup = async (req: Request, res: Response) => {
  try {
    const sender: string = req.params.sender;
    const receive: string = req.params.receive;
    const response: response = await getGroupService(sender, receive);
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

const deleteGroup = async (req: Request, res: Response) => {
  try {
    const sender: string = req.body.sender;
    const receive: string = req.body.receive;
    const response: response = await updateIsDeleteGroupService(
      sender,
      receive
    );
    res.status(200).json(response);
  } catch (error) {
    res.status(200).json({ statusCode: "400", message: `${error}` });
  }
};

export default {
  createGroup,
  getGroupByUser,
  deleteGroup,
  getGroup,
};
