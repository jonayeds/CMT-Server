import { JwtPayload } from "jsonwebtoken";
import { IContent } from "./content.interface";
import { Content } from "./content.model";
import { Classroom } from "../classroom/classroom.model";


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

export const ContentService = {
    createContent,
}