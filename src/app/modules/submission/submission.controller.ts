import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../../middlewares/auth";
import { catchAsync } from "../../utils/catchAsync";
import { SubmissionServices } from "./submission.service";
import { sendResponse } from "../../utils/sendResponse";

const submitAssignment = catchAsync(async(req:CustomRequest, res)=>{
    const result = await SubmissionServices.submitAssignment(req.body, req.user as JwtPayload)
    sendResponse(res, {
        statusCode:200,
        message:"Successfully submited Assignment" ,
        success:true,
        data:result
    })
})

const getAssignmentSubmissions = catchAsync(async(req:CustomRequest, res)=>{
    const result = await SubmissionServices.getAssignmentSubmissions(req.params.assignmentId, req.user as JwtPayload)
    sendResponse(res, {
        statusCode:200,
        message:"Successfully fetched Assignment Submissions",
        success:true,
        data:result
    })
})
const getASingleSubmission = catchAsync(async(req:CustomRequest, res)=>{
    const result = await SubmissionServices.getASingleSubmission(req.params.submissionId)
    sendResponse(res, {
        statusCode:200,
        message:"Successfully fetched Submission",
        success:true,
        data:result
    })
})
const myAssignmentSubmission = catchAsync(async(req:CustomRequest, res)=>{
    const result = await SubmissionServices.myAssignmentSubmission(req.params.assignmentId, req.user as JwtPayload)
    sendResponse(res, {
        statusCode:200,
        message:"Successfully fetched Assignment Submission",
        success:true,
        data:result
    })     

})

const evaluateSubmission = catchAsync(async(req:CustomRequest, res)=>{
    const result = await SubmissionServices.evaluateSubmission(req.params.submissionId, req.body.marks, req.user as JwtPayload)
    sendResponse(res, {
        statusCode:200,
        message:"Successfully evaluated Assignment Submission",
        success:true,
        data:result
    })          
})


export const SubmissionControllers = {
    submitAssignment,
    getAssignmentSubmissions,
    getASingleSubmission,
    myAssignmentSubmission,
    evaluateSubmission
}