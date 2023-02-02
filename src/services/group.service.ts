import { Op } from "sequelize";
import { groupModel } from "../models/group.model";
import { group } from "../interfaces/group.interface";
import response from "../interfaces/response.interface";

const createGroupService = async (newGroup: group): Promise<response> => {
  newGroup.isDelete = false;
  newGroup.updateAt = new Date();
  if (newGroup.sender > newGroup.receive) {
    let coppy: String = newGroup.sender;
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
    foundGroup.isDelete = false;
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
    },
    order: [["updateAt", "DESC"]],
  });
  return {
    statusCode: "200",
    message: "",
    data: foundGroup,
  };
};

export { createGroupService, getGroupByUserService };
