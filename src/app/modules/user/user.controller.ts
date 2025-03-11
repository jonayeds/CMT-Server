import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";

const registerUser = catchAsync(async (req, res, next) => {
  const user = req.body;
  const result = await UserServices.registerUserIntoDB(user);
  res.cookie("accessToken", result.accessToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });
  sendResponse(res, {
    statusCode: 200,
    message: "Registered Successfully",
    success: true,
    data: result,
  });
});

const loginUser = catchAsync(async (req, res, next) => {
  const loginData = req.body;
  const result = await UserServices.loginUser(loginData);
  res.cookie("accessToken", result.accessToken);
  sendResponse(res, {
    success: true,
    message: "Login Successfull",
    statusCode: 200,
    data: result,
  });
});

export const UserControllers = {
  registerUser,
  loginUser,
};
