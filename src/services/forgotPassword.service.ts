import bcrypt from "bcrypt";
import { forgotPasswordModel } from "../models/forgotPassword.model";
import { forgotPassword } from "../interfaces/forgotPassword.interface";
import response from "../interfaces/response.interface";

const createVerifyPasswordService = async (
  newVerify: forgotPassword
): Promise<response> => {
  newVerify.createAt = new Date();
  newVerify.effectiveSeconds = 600;
  newVerify.password = bcrypt.hashSync(
    newVerify.password,
    bcrypt.genSaltSync(8)
  );
  await forgotPasswordModel.create(newVerify);
  return { statusCode: "200", message: "tạo xác minh thành công" };
};

const getVerifyPasswordService = async (
  email: string,
  uniqueString: string
): Promise<response> => {
  const foundVerify: forgotPassword | null = await forgotPasswordModel.findOne({
    where: {
      email: email,
      uniqueString: uniqueString,
    },
  });
  return {
    statusCode: "200",
    message: "lấy xác minh thành công",
    data: foundVerify,
  };
};

const deleteVerifyPasswordService = async (
  email: string
): Promise<response> => {
  await forgotPasswordModel.destroy({
    where: {
      email: email,
    },
  });
  return { statusCode: "200", message: "xóa xác minh thành công" };
};

export {
  createVerifyPasswordService,
  deleteVerifyPasswordService,
  getVerifyPasswordService,
};
