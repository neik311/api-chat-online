import { Op } from "sequelize";
import { groupModel } from "../models/group.model";
import { group } from "../interfaces/group.interface";
import { blockUser } from "../interfaces/blockUser.interface";
import response from "../interfaces/response.interface";
import { getBlockUserService } from "./blockUser.service";

const createGroupService = async (newGroup: group): Promise<response> => {
  newGroup.isDelete = false;
  newGroup.updateAt = new Date();
  const foundBlock: blockUser | null = (
    await getBlockUserService(newGroup.sender, newGroup.receive)
  ).data;
  if (foundBlock) {
    if (foundBlock.blocker === newGroup.sender) {
      return {
        statusCode: "401",
        message: "bạn đã chặn người dùng này",
      };
    }
    return {
      statusCode: "402",
      message: "Người dùng này đã chặn bạn",
    };
  }
  if (newGroup.sender > newGroup.receive) {
    let coppy: string = newGroup.sender;
    newGroup.sender = newGroup.receive;
    newGroup.receive = coppy;
  }
  let foundGroup: group | null = await groupModel.findOne({
    where: {
      sender: newGroup.sender,
      receive: newGroup.receive,
    },
  });
  if (!foundGroup) {
    const group: group = await groupModel.create(newGroup);
    return {
      statusCode: "200",
      message: "tạo nên thành công",
      data: group,
    };
  }
  if (foundGroup?.isDelete === true) {
    await groupModel.update(
      { isDelete: false, updateAt: new Date() },
      { where: { id: foundGroup?.id } }
    );
    return {
      statusCode: "200",
      message: "tạo nên thành công",
      data: foundGroup,
    };
  }
  return {
    statusCode: "403",
    message: "nhóm đã tồn tại",
  };
};

const getGroupByUserService = async (userId: string): Promise<response> => {
  const foundGroup: group[] = await groupModel.findAll({
    where: {
      [Op.or]: [{ sender: userId }, { receive: userId }],
      isDelete: false,
    },
    order: [["updateAt", "DESC"]],
  });
  return {
    statusCode: "200",
    message: "",
    data: foundGroup,
  };
};

const getGroupService = async (
  sender: string,
  receive: string
): Promise<response> => {
  if (sender > receive) {
    let coppy: string = sender;
    sender = receive;
    receive = coppy;
  }
  const foundGroup: group | null = await groupModel.findOne({
    where: {
      sender: sender,
      receive: receive,
      isDelete: false,
    },
  });
  return {
    statusCode: "200",
    message: "",
    data: foundGroup,
  };
};

const updateIsDeleteGroupService = async (
  sender: string,
  receive: string
): Promise<response> => {
  if (sender > receive) {
    let coppy: string = sender;
    sender = receive;
    receive = coppy;
  }
  await groupModel.update(
    {
      isDelete: true,
      updateAt: new Date(),
    },
    {
      where: { sender: sender, receive: receive },
    }
  );
  return {
    statusCode: "200",
    message: "cập nhật nhóm thành công",
  };
};

const updateTimeGroupService = async (id: number): Promise<response> => {
  await groupModel.update(
    {
      updateAt: new Date(),
    },
    {
      where: { id: id },
    }
  );
  return {
    statusCode: "200",
    message: "cập nhật nhóm thành công",
  };
};

export {
  createGroupService,
  getGroupByUserService,
  updateIsDeleteGroupService,
  getGroupService,
  updateTimeGroupService,
};
