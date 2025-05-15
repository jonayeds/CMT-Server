import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../../middlewares/auth";
import { catchAsync } from "../../utils/catchAsync";
import { AssignmentServices } from "./assignment.service";
import { sendResponse } from "../../utils/sendResponse";

const createAssignment = catchAsync(async(req:CustomRequest, res)=>{
    const result  = await AssignmentServices.createAssignment(req.body, req.user as JwtPayload)
    sendResponse(res, {
        statusCode:200,
        message:"Successfully created Assignment",
        success:true,
        data:result
    })
})

const getClassroomAssignments = catchAsync(async(req:CustomRequest, res)=>{
    const result  = await AssignmentServices.getClassroomAssignments(req.params.classroomId, req.user as JwtPayload)
    sendResponse(res, {
        statusCode:200,
        message:"Successfully fetched Assignments",
        success:true,
        data:result
    })
})

const getASingleAssignment = catchAsync(async(req:CustomRequest, res)=>{
    const result  = await AssignmentServices.getASingleAssignment(req.params.assignmentId, req.user as JwtPayload)
    sendResponse(res, {
        statusCode:200,
        message:"Successfully fetched Assignment",
        success:true,
        data:result
    })
})

export const AssignmentControllers = {
    createAssignment,
    getClassroomAssignments,
    getASingleAssignment
}