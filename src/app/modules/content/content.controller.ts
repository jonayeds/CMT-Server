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

const getClassroomContents = catchAsync(async(req:CustomRequest, res, next)=>{
    const {classroomId} = req.params
    const result = await ContentService.getClassroomContents(classroomId, req.user as JwtPayload)
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Classroom contents fetched successfully",
        data:result,
    })
})

const deleteContent = catchAsync(async(req:CustomRequest, res, next)=>{
    const {contentId} = req.params
    const result = await ContentService.deleteContent(contentId, req.user as JwtPayload)
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Content deleted successfully",
        data:result,
    })
})

const getASingleContent = catchAsync(async(req:CustomRequest, res, next)=>{
    const {contentId} = req.params
    const result = await ContentService.getASingleContent(contentId, req.user as JwtPayload)
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Content fetched successfully",
        data:result,
    })
})

export const ContentController = {
    createContent,
    getClassroomContents,
    deleteContent,
    getASingleContent
}