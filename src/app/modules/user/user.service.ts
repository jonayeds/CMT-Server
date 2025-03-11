import config from "../../config";
import { IUser } from "./user.interface";
import { User } from "./user.model";
import jwt from "jsonwebtoken";

const registerUserIntoDB = async (user: IUser) => {
  const isUserExist = await User.isUserExist(user.email, user.id);
  if (isUserExist) {
    throw new Error("User Already Exists!!!");
  }

  const result = await User.create(user);
  if (!result) {
    throw new Error("Something went wrong");
  }

  //   sign jwt token
  const jwtPayload  = {
    id:result.id,
    email:result.email,
    role:result.role
  }
  const accessToken = jwt.sign(jwtPayload, config.jwt_access_secret as string,{
    expiresIn:'10d'
  } )

  return {data:result, accessToken};
};

export const UserServices = {
  registerUserIntoDB,
};
