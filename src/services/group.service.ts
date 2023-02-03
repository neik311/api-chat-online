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
    if (foundBlock.blocked === newGroup.sender) {
      return {
        statusCode: "400",
        message: "you have blocked this user",
      };
    }
    return {
      statusCode: "400",
      message: "This user has blocked you",
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
      message: "create success",
      data: group,
    };
  }
  if (foundGroup?.isDelete === true) {
    await groupModel.update(
      { isDelete: false },
      { where: { id: foundGroup?.id } }
    );
    return {
      statusCode: "200",
      message: "create success",
      data: foundGroup,
    };
  }
  return {
    statusCode: "200",
    message: "group already exist",
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

const updateGroupService = async (id: string): Promise<response> => {
  await groupModel.update({ isDelete: true }, { where: { id: id } });
  return {
    statusCode: "200",
    message: "update group success",
  };
};

export { createGroupService, getGroupByUserService, updateGroupService };
