import { CustomRequest } from "../../middlewares/auth";
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

const getAllClassrooms = catchAsync(async(req:CustomRequest,res,next)=>{
    const result = await ClassroomService.getAllClassrooms()
    console.log(req.user)
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Successfully fetched all Classrooms",
        data:result
    })
})

const getASingleClassroom = catchAsync(async(req, res, next)=>{
    const classroomId = req.params.classroomId
    const result = await ClassroomService.getASingleClassroom(classroomId)
    sendResponse(res,{
        success:true,
        message:"Successfully fetched Classroom data",
        statusCode:200,
        data:result
    })
})

const deleteClassroom = catchAsync(async(req, res, next)=>{
    const {classroomId} = req.params 
    const result = await ClassroomService.deleteClassroomFromDB(classroomId)
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Successfully deleted Classroom",
        data:result
    })
})

export const ClassroomController = {
    createClassroom,
    getAllClassrooms,
    getASingleClassroom,
    deleteClassroom,
}