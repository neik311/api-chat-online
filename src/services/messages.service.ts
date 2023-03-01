import { messagesModel } from "../models/messages.model";
import { messages } from "../interfaces/messages.interface";
import response from "../interfaces/response.interface";
import { updateTimeGroupService } from "./group.service";
const createMessagesService = async (
  newMessages: messages
): Promise<response> => {
  newMessages.createAt = new Date();
  const messages: messages = await messagesModel.create(newMessages);
  await updateTimeGroupService(newMessages.groupId);
  return {
    statusCode: "200",
    message: "tạo tin nhắn thành công",
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
  return {
    statusCode: "200",
    message: "lấy tin nhắn thành công",
    data: allMessaes,
  };
};

export { createMessagesService, getMessagesInGroupService };
