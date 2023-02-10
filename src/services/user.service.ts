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
  if (foundUser?.verify === false && foundUser.id !== newUser.id) {
    return { statusCode: "400", message: "user already exist" };
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
  return { statusCode: "200", message: "create user success" };
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
    message: "get member success",
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
      expiresIn: 1800,
    });
    return accessToken;
  }
  const refreshToken = jwt.sign(payload, key, {
    expiresIn: 72000,
  });
  return refreshToken;
};

const loginByTokenService = async (token: string): Promise<any> => {
  let key = process.env.JWT_SECRET || "";
  try {
    const decoded: any = jwt.verify(token, key);
    const foundUser: user | null = await getUserById(decoded?.id);
    if (foundUser?.refreshToken !== token) {
      return { statusCode: "401", message: "incorrect token" };
    }
    const accessToken = getToken(foundUser.id, foundUser?.role, "accessToken");
    return {
      statusCode: "200",
      message: "login success",
      data: { ...foundUser.dataValues, accessToken },
    };
  } catch (error) {
    return { statusCode: "402", message: "token has expired" };
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
    return { statusCode: "400", message: "user not found" };
  }
  const checkPass = bcrypt.compareSync(password, foundUser.password);
  if (checkPass === false) {
    return { statusCode: "400", message: "incorrect password" };
  }
  if (foundUser.lock === true) {
    return { statusCode: "400", message: "locked user" };
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
    message: "login success",
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
  getUserService,
  loginService,
  loginByTokenService,
  updateUserService,
  verifyUserService,
};
