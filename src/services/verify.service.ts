import { verifyModel } from "../models/verify.model";
import { verify } from "../interfaces/verify.interface";
import response from "../interfaces/response.interface";

const createVerifyService = async (newVerify: verify): Promise<response> => {
  newVerify.createAt = new Date();
  newVerify.effectiveSeconds = 3600;
  await verifyModel.create(newVerify);
  return { statusCode: "200", message: "tạo xác minh thành công" };
};

const getVerifyService = async (
  email: string,
  uniqueString: string
): Promise<response> => {
  const foundVerify: verify | null = await verifyModel.findOne({
    where: {
      email: email,
      uniqueString: uniqueString,
    },
  });
  return {
    statusCode: "200",
    message: "tạo xác minh thành công",
    data: foundVerify,
  };
};

const deleteVerifyService = async (email: string): Promise<response> => {
  await verifyModel.destroy({
    where: {
      email: email,
    },
  });
  return { statusCode: "200", message: "xóa xác minh thành công" };
};

export { createVerifyService, deleteVerifyService, getVerifyService };
