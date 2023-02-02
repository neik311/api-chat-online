import { messagesModel } from "../models/messages.model";
import { messages } from "../interfaces/messages.interface";
import response from "../interfaces/response.interface";

const createMessagesService = async (
  newMessages: messages
): Promise<response> => {
  newMessages.isDelete = false;
  newMessages.createAt = new Date();
  const messages: messages = await messagesModel.create(newMessages);
  return {
    statusCode: "200",
    message: "create messages success",
    data: messages,
  };
};

const getMessagesInGroupService = async (
  groupId: number
): Promise<response> => {
  const allMessaes: messages[] = await messagesModel.findAll({
    where: {
      groupId: groupId,
    },
  });
  return { statusCode: "200", message: "", data: allMessaes };
};

export { createMessagesService, getMessagesInGroupService };
