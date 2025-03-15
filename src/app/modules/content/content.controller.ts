import { JwtPayload } from "jsonwebtoken";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ContentService } from "./content.service";
import { CustomRequest } from "../../middlewares/auth";

const createContent = catchAsync(async(req:CustomRequest,res,next)=>{
    const contentData = req.body
    const result = await ContentService.createContent(contentData, req.user as JwtPayload)
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Content created successfully",
        data:result,
    })
})

export const ContentController = {
    createContent,
}