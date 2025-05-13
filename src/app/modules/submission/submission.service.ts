import { JwtPayload } from "jsonwebtoken"
import { ISubmission } from "./submission.interface"
import { Submission } from "./submission.model"
import { Assignment } from "../assignment/assignment.model"
import { Attendance } from "../attendance/attendance.model"
import { Classroom } from "../classroom/classroom.model"

const submitAssignment =async (payload:ISubmission, user:JwtPayload)=>{
    const isAssignmentExists = await Assignment.findById(payload.assignment)
    if(!isAssignmentExists){
        throw new Error("Assignment does not exists");
    }
    const isInTheClassroom = await Attendance.findOne({student:user._id})
    if(!isInTheClassroom){
        throw new Error("You are not Authorized to submit Assignment!!!");
    }
    const now = new Date()
    const deadline = new Date(isAssignmentExists.deadline)
    if(now > deadline){
        payload.isLate = true
    }else{
        payload.isLate = false
    }
    payload.student = user._id
    const result = await Submission.create(payload)
    return result
}

const getAssignmentSubmissions = async (assignmentId:string, user:JwtPayload)=>{  
      const isAssignmentExists = await Assignment.findById(assignmentId)
    if(!isAssignmentExists){
        throw new Error("Assignment does not exists");
    }
    const isInTheClassroom = await Classroom.findById(isAssignmentExists.classroom)
    if(isInTheClassroom?.faculty.toString() !== user._id.toString()){
        throw new Error("You are not Authorized to get Assignment Submissions!!!");
    }
    const result = await Submission.find({assignment:assignmentId}).populate("student")
    return result
}
const getASingleSubmission = async (submissionId:string)=>{  
      const isSubmissionExists = await Submission.findById(submissionId).populate("student assignment")
    if(!isSubmissionExists){
        throw new Error("Submission does not exists");
    }
    return isSubmissionExists
}

export const SubmissionServices = {
    submitAssignment,
    getAssignmentSubmissions,
    getASingleSubmission
}