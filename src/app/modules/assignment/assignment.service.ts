import { JwtPayload } from "jsonwebtoken"
import { IAssignment } from "./assignment.inteface"
import { Assignment } from "./assignment.model"
import { Classroom } from "../classroom/classroom.model"

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


export const AssignmentServices = {
    createAssignment
}