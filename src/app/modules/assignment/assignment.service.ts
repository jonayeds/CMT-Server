import { JwtPayload } from "jsonwebtoken"
import { IAssignment } from "./assignment.inteface"
import { Assignment } from "./assignment.model"
import { Classroom } from "../classroom/classroom.model"
import { Attendance } from "../attendance/attendance.model"
import { IClassroom } from "../classroom/classroom.interface"

const createAssignment = async(payload:IAssignment, user:JwtPayload)=>{
    const isClassroomExists = await Classroom.findById(payload.classroom)
    if(!isClassroomExists){
        throw new Error("Classroom does not exists!!!")
    }
    if(isClassroomExists.faculty.toString() !== user._id.toString()){
        throw new Error("You are not Authorized to create Assignment");
    }
    const result = await Assignment.create(payload)
    return result
}

const getClassroomAssignments = async(classroomId:string, user:JwtPayload)=>{
    if(user.role === "student"){
        const isInTheClassroom = await Attendance.findOne({classroom:classroomId, student:user._id}) 
    
        if(!isInTheClassroom){
                throw new Error("You are not in the classroom")
        }
    }else if(user.role === "faculty"){
        const isClassroomExists = await Classroom.findById(classroomId)
        if(!isClassroomExists){
            throw new Error("Classroom does not exists!!!")
        }
        if(isClassroomExists.faculty.toString() !== user._id.toString()){
            throw new Error("You are not Authorized to get Assignment");
        }               
    }
    const result = await Assignment.find({classroom:classroomId})
    return result 
}

export const getASingleAssignment = async(assignmentId:string, user:JwtPayload)=>{ 
    const isAssignmentExists = await Assignment.findById(assignmentId).populate("classroom")
    if(!isAssignmentExists){
        throw new Error("Assignment does not exists!!!")
    }
    if(user.role === "student" ){
        const isInTheClassroom = await Attendance.findOne({classroom:isAssignmentExists.classroom._id, student:user._id}) 
        if(!isInTheClassroom){
                throw new Error("You are not in the classroom")
        }
    }
    else if(user.role === "faculty"){
        if((isAssignmentExists.classroom as unknown as IClassroom).faculty.toString() !== user._id.toString()){
            throw new Error("You are not Authorized to get Assignment");
        }    
    }
    return isAssignmentExists
}





export const AssignmentServices = {
    createAssignment,
    getClassroomAssignments,
    getASingleAssignment,
}