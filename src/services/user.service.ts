import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { map } from "modern-async";
import { userModel } from "../models/user.model";
import { user } from "../interfaces/user.interface";
import response from "../interfaces/response.interface";
import { users } from "../index";
import dotenv from "dotenv";
dotenv.config();

const ACCESS_TIME = 1800; // 30m
const REFRESH_TIME = 864000; // 10 day

const createUserService = async (newUser: user): Promise<response> => {
  const foundUser: user | null = await userModel.findOne({
    where: { [Op.or]: [{ email: newUser.email }, { id: newUser.id }] },
  });
  if (foundUser?.verify === true) {
    return { statusCode: "400", message: "Tài khoản đã tồn tại" };
  }
  if (foundUser?.verify === false && foundUser.id !== newUser.id) {
    return { statusCode: "400", message: "Tài khoản đã tồn tại" };
  }
  if (foundUser?.verify === false && foundUser.email === newUser.email) {
    await userModel.destroy({
      where: {
        email: foundUser.email,
      },
    });
  }
  newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(8));
  newUser.role = "user";
  newUser.describe = newUser?.describe || "";
  newUser.lock = false;
  newUser.verify = false;
  await userModel.create(newUser);
  return { statusCode: "200", message: "Tạo tài khoản thành công" };
};

const getUserByEmail = async (email: string) => {
  const foundUser: user | null = await userModel.findOne({
    where: { email: email, verify: true },
  });
  return foundUser;
};

const getUserById = async (id: string) => {
  const foundUser: user | null = await userModel.findOne({
    where: { id: id, verify: true },
  });
  return foundUser;
};

const getUserService = async (id: string, email: string) => {
  const foundUser: user | null = await userModel.findOne({
    where: {
      [Op.or]: [{ email: email }, { id: id }],
      lock: false,
      verify: true,
    },
    attributes: ["id", "firstName", "lastName", "email", "describe", "avatar"],
  });
  return {
    statusCode: "200",
    message: "lấy người dùng thành công",
    data: foundUser,
  };
};

const getAllUserService = async () => {
  let foundUser: any[] = await userModel.findAll({
    where: {
      role: "user",
      verify: true,
    },
    attributes: ["id", "firstName", "lastName", "email", "avatar", "lock"],
    order: [["id", "ASC"]],
  });
  await map(foundUser, (data, index) => {
    const found = users.find((u) => u.id === data.id);
    foundUser[index].dataValues.status = false;
    if (found) {
      foundUser[index].dataValues.status = true;
    }
  });
  return {
    statusCode: "200",
    message: "lấy người dùng thành công",
    data: foundUser,
  };
};

const getToken = (
  id: string,
  role: string | undefined,
  type: string
): string => {
  let key = process.env.JWT_SECRET || "";
  const payload = {
    id: id,
    rule: role || "",
  };
  if (type === "accessToken") {
    const accessToken = jwt.sign(payload, key, {
      expiresIn: ACCESS_TIME,
    });
    return accessToken;
  }
  const refreshToken = jwt.sign(payload, key, {
    expiresIn: REFRESH_TIME,
  });
  return refreshToken;
};

const loginByTokenService = async (token: string): Promise<any> => {
  let key = process.env.JWT_SECRET || "";
  try {
    const decoded: any = jwt.verify(token, key);
    const foundUser: user | null = await getUserById(decoded?.id);
    if (foundUser?.refreshToken !== token) {
      return { statusCode: "401", message: " token không đúng" };
    }
    const accessToken = getToken(foundUser.id, foundUser?.role, "accessToken");
    return {
      statusCode: "200",
      message: "Đăng nhập thành công ",
      data: { ...foundUser.dataValues, accessToken },
    };
  } catch (error) {
    return { statusCode: "402", message: "token đã hết hạn" };
  }
};

const loginService = async (
  email: string,
  password: string
): Promise<response> => {
  let foundUser: user | null = await getUserByEmail(email);
  if (!foundUser) {
    foundUser = await getUserById(email);
  }
  if (!foundUser) {
    return { statusCode: "400", message: "không tìm thấy người dùng" };
  }
  const checkPass = bcrypt.compareSync(password, foundUser.password);
  if (checkPass === false) {
    return { statusCode: "400", message: "mật khẩu không đúng" };
  }
  if (foundUser.lock === true) {
    return { statusCode: "400", message: "tài khoản đã bị khóa " };
  }
  let refreshToken = "";
  let key = process.env.JWT_SECRET || "";
  if (!foundUser.refreshToken) {
    refreshToken = getToken(foundUser.id, foundUser?.role, "refreshToken");
    userModel.update(
      {
        refreshToken: refreshToken,
      },
      {
        where: {
          id: foundUser.id,
        },
      }
    );
  }
  if (foundUser?.refreshToken) {
    try {
      jwt.verify(foundUser?.refreshToken, key);
      refreshToken = foundUser?.refreshToken;
    } catch (error) {
      refreshToken = getToken(foundUser.id, foundUser?.role, "refreshToken");
      userModel.update(
        {
          refreshToken: refreshToken,
        },
        {
          where: {
            id: foundUser.id,
          },
        }
      );
    }
  }
  const accessToken = getToken(foundUser.id, foundUser?.role, "accessToken");
  foundUser.password = "";
  return {
    statusCode: "200",
    message: "Đăng nhập thành công",
    data: { ...foundUser.dataValues, accessToken, refreshToken },
  };
};

const updateUserService = async (newUser: user): Promise<response> => {
  const foundUser: user | null = await userModel.findOne({
    where: { id: newUser.id },
  });
  if (!foundUser) {
    return {
      statusCode: "400",
      message: "không tìm thấy người dùng",
    };
  }
  await userModel.update(
    {
      firstName: newUser.firstName ? newUser.firstName : foundUser.lastName,
      lastName: newUser.lastName ? newUser.lastName : foundUser.lastName,
      birthday: newUser.birthday ? newUser.birthday : foundUser.birthday,
      describe: newUser.describe ? newUser.describe : foundUser.describe,
      avatar: newUser.avatar ? newUser.avatar : foundUser.avatar,
    },
    { where: { id: newUser.id } }
  );
  return {
    statusCode: "200",
    message: "cập nhật người dùng thành công ",
  };
};

const verifyUserService = async (email: string): Promise<response> => {
  await userModel.update(
    {
      verify: true,
    },
    { where: { email: email } }
  );
  return {
    statusCode: "200",
    message: "xác thực người dùng thành công ",
  };
};

const changePasswordUserService = async (
  email: string,
  newpassword: string
): Promise<response> => {
  await userModel.update(
    {
      password: newpassword,
    },
    { where: { email: email } }
  );
  return {
    statusCode: "200",
    message: "thay đổi mật khẩu thành công ",
  };
};

const lockUserService = async (
  email: string,
  lock: boolean
): Promise<response> => {
  await userModel.update(
    {
      lock: lock,
    },
    { where: { email: email } }
  );
  return {
    statusCode: "200",
    message: "cập nhật thành công ",
  };
};

export {
  createUserService,
  getUserService,
  getAllUserService,
  loginService,
  loginByTokenService,
  updateUserService,
  verifyUserService,
  changePasswordUserService,
  lockUserService,
};
