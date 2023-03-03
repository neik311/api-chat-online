import { Op } from "sequelize";
import { blockUserModel } from "../models/blockUser.model";
import { blockUser } from "../interfaces/blockUser.interface";
import response from "../interfaces/response.interface";
import { updateIsDeleteGroupService } from "./group.service";
import sequelize from "../config/connectDB";

const createBlockUserService = async (
  newBlock: blockUser
): Promise<response> => {
  newBlock.createAt = new Date();
  await updateIsDeleteGroupService(newBlock.blocker, newBlock.blocked);
  const blockUser: blockUser = await blockUserModel.create(newBlock);
  return {
    statusCode: "200",
    message: "tạo blockUser thành công",
    data: blockUser,
  };
};

const getBlockUserService = async (
  blocker: string,
  blocked: string,
  status?: string
): Promise<response> => {
  if (status === "1") {
    const block: blockUser | null = await blockUserModel.findOne({
      where: {
        blocker: blocker,
        blocked: blocked,
      },
    });
    return {
      statusCode: "200",
      message: "lấy dữ liệu thành công",
      data: block,
    };
  }
  const block: blockUser | null = await blockUserModel.findOne({
    where: {
      [Op.or]: [
        { blocker: blocker, blocked: blocked },
        { blocker: blocked, blocked: blocker },
      ],
    },
  });
  return { statusCode: "200", message: "lấy dữ liệu thành công", data: block };
};

const getBlockUserByBlockerService = async (
  blocker: string
): Promise<response> => {
  const data: any = await sequelize.query(
    `SELECT DISTINCT b.id,b.blocker,b.blocked,u.avatar FROM blockuser as b,users as u where b.blocker = "${blocker}" and b.blocked = u.id`
  );
  return {
    statusCode: "200",
    message: "lấy dữ liệu thành công",
    data: data[0],
  };
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
  return { statusCode: "200", message: "xóa chặn người dùng thành công" };
};

export {
  createBlockUserService,
  getBlockUserService,
  getBlockUserByBlockerService,
  deleteBlockUserService,
};
