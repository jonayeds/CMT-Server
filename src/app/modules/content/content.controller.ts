import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ContentService } from "./content.service";

const createContent = catchAsync(async(req,res,next)=>{
    const contentData = req.body
    const result = await ContentService.createContent(contentData)
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