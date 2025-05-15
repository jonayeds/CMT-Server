import { JwtPayload } from "jsonwebtoken"
import { ISubmission } from "./submission.interface"
import { Submission } from "./submission.model"
import { Assignment } from "../assignment/assignment.model"
import { Attendance } from "../attendance/attendance.model"
import { Classroom } from "../classroom/classroom.model"
import { IClassroom } from "../classroom/classroom.interface"

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

const myAssignmentSubmission = async(assignmentId:string, user:JwtPayload)=>{
    const isAssignmentExists = await Assignment.findById(assignmentId)
    if(!isAssignmentExists){
        throw new Error("Assignment does not exists");
    }   
    const result = await Submission.findOne({assignment:assignmentId, student:user._id}) 
    return result         
}

const evaluateSubmission = async(submissionId:string, marks:number, user:JwtPayload )=>{
    const isSubmissionExists = await Submission.findById(submissionId)
    if(!isSubmissionExists){
        throw new Error("Submission does not exists");
    }
    const isAssignmentExists = await Assignment.findById(isSubmissionExists.assignment).populate("classroom")
    if(!isAssignmentExists){
        throw new Error("Assignment does not exists");
    }
    if(isAssignmentExists.totalMarks < marks || marks < 0){
        throw new Error("Marks should be less than or equal to total marks");   
    }
    if((isAssignmentExists?.classroom as unknown as IClassroom).faculty.toString() !== user._id.toString()){
        throw new Error("You are not Authorized to evaluate Assignment Submissions!!!");
    }
    const result  = await Submission.findByIdAndUpdate(submissionId, {marks:Number(marks)}, {new:true})
    return result                           
}

export const SubmissionServices = {
    submitAssignment,
    getAssignmentSubmissions,
    getASingleSubmission,
    myAssignmentSubmission,
    evaluateSubmission  
}