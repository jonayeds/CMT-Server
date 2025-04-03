import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../../middlewares/auth";
import { catchAsync } from "../../utils/catchAsync";
import { MessageServices } from "./message.service";
import { sendResponse } from "../../utils/sendResponse";

const sendMessage = catchAsync(async(req:CustomRequest,res, next)=>{
    const payload = req.body
    const result = await MessageServices.sendMessage( payload)
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Successfully sent message",
        data:result,
    })
})
const getChatMessage = catchAsync(async(req:CustomRequest,res, next)=>{
    const user = req.user
    const {chatId} = req.params
    const result = await MessageServices.getChatMessages( chatId, user as JwtPayload)
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Successfully fetched chat message",
        data:result,
    })
})

export const MessageControllers = {
    sendMessage,
    getChatMessage
}