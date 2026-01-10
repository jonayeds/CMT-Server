import strict from "assert/strict";
import config from "../../config";
import { signJwt } from "../../utils/signJwt";
import { IAuth, IUser } from "./user.interface";
import { User } from "./user.model";
import { JwtPayload } from "jsonwebtoken";

const registerUserIntoDB = async (user: IUser) => {
  const isUserExist = await User.isUserExist({
    email: user.email,
    id: user.id,
  });
  if (isUserExist) {
    throw new Error("User Already Exists!!!");
  }

  const result = await User.create(user);
  if (!result) {
    throw new Error("Something went wrong");
  }

  //   sign jwt token
  const jwtPayload = {
    _id: result._id,
    id: result.id,
    email: result.email,
    role: result.role,
  };
  const accessToken = signJwt(
    jwtPayload,
    config.jwt_access_secret as string,
    "10d"
  );

  return { data: result, accessToken };
};

const loginUser = async (loginData: IAuth) => {
  const user = await User.isUserExist({
    identification: loginData.identification,
  });
  if (!user) {
    throw new Error("User not found");
  }
  const isPasswordCorrect = await User.isPasswordCorrect(
    loginData.password,
    user.password
  );
  if (!isPasswordCorrect) {
    throw new Error("Incorrect password or email!!!");
  }

  // sign accessToken
  const jwtPayload = {
    _id: user._id,
    id: user.id,
    email: user.email,
    role: user.role,
  };
  const accessToken = signJwt(
    jwtPayload,
    config.jwt_access_secret as string,
    "10d"
  );

  return {
    data: user,
    accessToken,
  };
};

const getMe = async (user: JwtPayload) => {
  const result = User.findById(user._id);
  return result;
};

export const UserServices = {
  registerUserIntoDB,
  loginUser,
  getMe,
};
