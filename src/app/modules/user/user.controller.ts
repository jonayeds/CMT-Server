import { UserServices } from "./user.service";
import { sendResponse } from "../../utils/sendResponse";
import { catchAsync } from "../../utils/catchAsync";

const registerUser = catchAsync(async(req, res, next)=>{
        const user = req.body
    const result  = await UserServices.registerUserIntoDB(user)
    sendResponse(res, {
        statusCode:200,
        message:"Registered Successfully",
        success:true,
        data:result
    })
})

export const UserControllers = {
    registerUser
}