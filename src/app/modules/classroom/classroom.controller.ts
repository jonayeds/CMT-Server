import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../../middlewares/auth";
import { catchAsync } from "../../utils/catchAsync";
import { sendResponse } from "../../utils/sendResponse";
import { ClassroomService } from "./classroom.service";

const createClassroom = catchAsync(async(req:CustomRequest,res,next)=>{
    const classroomData = req.body
    const result = await ClassroomService.createClassroomIntoDB(classroomData, req.user as JwtPayload)
    sendResponse(res,{
        success:true,
        message:"Successfully created Classroom",
        statusCode:200,
        data:result
    })
})

const getAllClassrooms = catchAsync(async(req,res,next)=>{
    const result = await ClassroomService.getAllClassrooms()
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Successfully fetched all Classrooms",
        data:result
    })
})

const getASingleClassroom = catchAsync(async(req:CustomRequest, res, next)=>{
    const classroomId = req.params.classroomId
    const result = await ClassroomService.getASingleClassroom(classroomId, req.user as JwtPayload)
    sendResponse(res,{
        success:true,
        message:"Successfully fetched Classroom data",
        statusCode:200,
        data:result
    })
})

const deleteClassroom = catchAsync(async(req:CustomRequest, res, next)=>{
    const {classroomId} = req.params 
    const user = req.user
    const result = await ClassroomService.deleteClassroomFromDB(classroomId, user as JwtPayload)
    sendResponse(res,{
        success:true,
        statusCode:200,
        message:"Successfully deleted Classroom",
        data:result
    })
})

const joinClassroom = catchAsync(async(req:CustomRequest,res,next)=>{
    const user = req.user
    const {joiningCode} = req.body
    const result = await ClassroomService.joinClassroom(joiningCode, user as JwtPayload)
    sendResponse(res, {
        statusCode:200,
        success:true,
        message:"Successfully joined Classroom",
        data:result
    })
})

const leaveClassroom = catchAsync(async(req:CustomRequest, res, next)=>{
    const {classroomId} = req.params
    const result = await ClassroomService.leaveClassroom(classroomId, req.user as JwtPayload)
    sendResponse(res,{
        success:true,
        message:"Successfully left classroom",
        statusCode:200,
        data:result
    }) 
})

const getMyClassrooms = catchAsync(async(req:CustomRequest, res, next)=>{
    const result = await ClassroomService.getMyClassrooms(req.user as JwtPayload)
    sendResponse(res,{
        success:true,
        message:"Successfully fetched my classrooms",
        statusCode:200,
        data:result
    })
})

const getClassroomStudents = catchAsync(async (req:CustomRequest,res,next)=>{
    const {classroomId} = req.params
    const result = await ClassroomService.getClassroomStudents(classroomId, req.user as JwtPayload) 
    sendResponse(res,{
        success:true,
        message:"Successfully fetched All students of the classroom",
        statusCode:200,
        data:result
    })
})


const removeStudentFromClassroom = catchAsync(async (req:CustomRequest,res,next)=>{
    const {classroomId, studentId} = req.body
    console.log(classroomId,studentId)
    const result = await ClassroomService.removeStudentFromClassroom( classroomId,studentId ,req.user as JwtPayload) 
    sendResponse(res,{
        success:true,
        message:"Successfully reomved student from the classroom",
        statusCode:200,
        data:result
    })
})

export const ClassroomController = {
    createClassroom,
    getAllClassrooms,
    getASingleClassroom,
    deleteClassroom,
    joinClassroom,
    leaveClassroom,
    getMyClassrooms,
    getClassroomStudents,
    removeStudentFromClassroom,
}