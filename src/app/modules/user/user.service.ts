import { IUser } from "./user.interface";
import { User } from "./user.model";

const registerUserIntoDB = async (user: IUser) => {
    const isUserExist = await User.isUserExist(user.email)
    if(isUserExist){
        throw new Error("User Already Exists!!!")
    }
  const result = await User.create(user);
  return result;
};

export const UserServices = {
  registerUserIntoDB,
};
