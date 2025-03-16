import { JwtPayload } from "jsonwebtoken";
import { IContent } from "./content.interface";
import { Content } from "./content.model";
import { Classroom } from "../classroom/classroom.model";
import { userRoles } from "../user/user.constant";
import { Attendance } from "../attendance/attendance.model";
import { IClassroom } from "../classroom/classroom.interface";


const createContent = async(payload:IContent, user:JwtPayload)=>{
    if(!(payload.contentFile && payload.contentLink)){
        throw new Error("Content file or link is required")
    }
    const isClassroomExists = await Classroom.findById(payload.classroom)
    if(!isClassroomExists){
        throw new Error("Classroom not found")
    }
    if(isClassroomExists.faculty.toString() !== user._id){
        throw new Error("You are not authorized to create content in this classroom")
    }

    const result = await Content.create(payload)
    return result
}

const getClassroomContents = async(classroomId:string, user:JwtPayload)=>{
    const isClassroomExists = await Classroom.findById(classroomId)
    if(!isClassroomExists){
        throw new Error("Classroom not found")
    }
    if((user.role === userRoles.FACULTY) && (isClassroomExists.faculty.toString() !== user._id)){
        throw new Error("You are not authorized to access this classroom contents!!!")
    }
    if(user.role === userRoles.STUDENT){
        const isJoined = await Attendance.findOne({student:user._id, classroom:classroomId})
        if(!isJoined){
            throw new Error("You are not joined in this classroom")
        }
    }

    const result = await Content.find({classroom:classroomId})
    return result
}

const deleteContent = async(contentId:string,user:JwtPayload)=>{
    const isContentExists = await Content.findById(contentId).populate("classroom")
    if(!isContentExists){
        throw new Error("Content not found")
    }
    if((isContentExists.classroom as unknown as IClassroom)?.faculty?.toString() !== user._id){
        throw new Error("You are not authorized to delete this content")
    }
    const result = await Content.findByIdAndDelete(contentId)
    return result
}

export const ContentService = {
    createContent,
    getClassroomContents,
    deleteContent
}