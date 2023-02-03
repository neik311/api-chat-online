import { Op } from "sequelize";
import { blockUserModel } from "../models/blockUser.model";
import { blockUser } from "../interfaces/blockUser.interface";
import response from "../interfaces/response.interface";

const createBlockUserService = async (
  newBlock: blockUser
): Promise<response> => {
  newBlock.createAt = new Date();
  const blockUser: blockUser = await blockUserModel.create(newBlock);
  return {
    statusCode: "200",
    message: "create blockUser success",
    data: blockUser,
  };
};

const getBlockUserService = async (
  blocker: string,
  blocked: string
): Promise<response> => {
  const block: blockUser | null = await blockUserModel.findOne({
    where: {
      [Op.or]: [
        { blocker: blocker, blocked: blocked },
        { blocker: blocked, blocked: blocker },
      ],
    },
  });
  return { statusCode: "200", message: "", data: block };
};

const getBlockUserByBlockerService = async (
  blocker: string
): Promise<response> => {
  const block: blockUser[] = await blockUserModel.findAll({
    where: {
      blocker: blocker,
    },
  });
  return { statusCode: "200", message: "", data: block };
};

const deleteBlockUserService = async (
  blocker: string,
  blocked: string
): Promise<response> => {
  await blockUserModel.destroy({
    where: {
      blocker: blocker,
      blocked: blocked,
    },
  });
  return { statusCode: "200", message: "" };
};

export {
  createBlockUserService,
  getBlockUserService,
  getBlockUserByBlockerService,
  deleteBlockUserService,
};
