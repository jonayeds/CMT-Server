import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ClassroomService } from "./classroom.service";

const createClassroom = catchAsync(async(req,res,next)=>{
    const classroomData = req.body
    const result = await ClassroomService.createClassroomIntoDB(classroomData)
    sendResponse(res,{
        success:true,
        message:"Successfully created Classroom",
        statusCode:200,
        data:result
    })
})

export const ClassroomController = {
    createClassroom
}