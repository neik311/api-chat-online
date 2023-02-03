import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { userModel } from "../models/user.model";
import { user } from "../interfaces/user.interface";
import response from "../interfaces/response.interface";
import dotenv from "dotenv";
dotenv.config();

const createUserService = async (newUser: user): Promise<response> => {
  const foundUser: user | null = await userModel.findOne({
    where: { [Op.or]: [{ email: newUser.email }, { id: newUser.id }] },
  });
  if (foundUser?.verify === true) {
    return { statusCode: "400", message: "user already exist" };
  }
  if (foundUser?.verify === false) {
    return {
      statusCode: "200",
      message: "The account already exists but has not been verified",
    };
  }
  newUser.password = bcrypt.hashSync(newUser.password, bcrypt.genSaltSync(8));
  newUser.role = "user";
  newUser.describe = "";
  newUser.lock = false;
  newUser.verify = false;
  await userModel.create(newUser);
  return { statusCode: "200", message: "create user success" };
};

const getUserByEmail = async (email: string) => {
  const foundUser: user | null = await userModel.findOne({
    where: { email },
  });
  return foundUser;
};

const getUserById = async (id: string) => {
  const foundUser: user | null = await userModel.findOne({
    where: { id },
  });
  return foundUser;
};

const getUserByIdService = async (id: string) => {
  const foundUser: user | null = await userModel.findOne({
    where: { id },
  });
  if (foundUser) {
    foundUser.password = "";
  }
  return {
    statusCode: "200",
    message: "get member success",
    data: foundUser,
  };
};

const getUserByEmailService = async (email: string): Promise<response> => {
  const foundUser: user | null = await getUserByEmail(email);
  if (foundUser) {
    foundUser.password = "";
  }
  return {
    statusCode: "200",
    message: "get member success",
    data: foundUser,
  };
};

const loginByTokenService = async (token: string): Promise<any> => {
  let key = process.env.JWT_SECRET || "";
  console.log(token);
  const decoded: any = jwt.verify(token, key);
  const foundUser: user | null = await getUserById(decoded?.id);
  return { statusCode: "200", message: "", data: foundUser };
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
    return { statusCode: "400", message: "user not found" };
  }
  const checkPass = bcrypt.compareSync(password, foundUser.password);
  if (checkPass === false) {
    return { statusCode: "400", message: "incorrect password" };
  }
  if (foundUser.lock === true) {
    return { statusCode: "400", message: "locked user" };
  }
  const payload = {
    id: foundUser.id,
    rule: foundUser?.role,
  };
  const key: string = process.env.JWT_SECRET || "";
  const token = jwt.sign(payload, key, {
    expiresIn: 86400,
  });
  foundUser.password = "";
  return {
    statusCode: "200",
    message: "login success",
    data: { ...foundUser.dataValues, token },
  };
};

const updateUserService = async (newUser: user): Promise<response> => {
  const foundUser: user | null = await userModel.findOne({
    where: { id: newUser.id },
  });
  if (!foundUser) {
    return {
      statusCode: "400",
      message: "user not found",
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
    message: "update user success",
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
    message: "update user success",
  };
};

export {
  createUserService,
  getUserByEmailService,
  getUserByIdService,
  loginService,
  loginByTokenService,
  updateUserService,
  verifyUserService,
};
