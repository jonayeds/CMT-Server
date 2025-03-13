import { JwtPayload } from "jsonwebtoken"
import { IClassroom } from "./classroom.interface"
import { Classroom } from "./classroom.model"
import { User } from "../user/user.model"

const createClassroomIntoDB = async(payload:IClassroom, user:JwtPayload)=>{
    const isClassroomExists = await Classroom.isClassroomExists(payload.faculty, payload.courseTitle, payload.courseCode)
    if(isClassroomExists){
        throw new Error("Classroom already exist!!!")
    }
    const currentUser = await User.findOne({id:user.id})
    if(currentUser){
        payload.faculty = currentUser?._id
    }
    while(true){
        const joiningCode = Math.random().toString(36).substring(2, 6);
        const isJoiningCodeExists = await Classroom.findOne({joiningCode})
        payload.joiningCode = joiningCode
        if(!isJoiningCodeExists) break
    }
    const result = await Classroom.create(payload)
    return result
}

const getAllClassrooms = async()=>{
    const result = await Classroom.find().populate("faculty")
    return result
}

const getASingleClassroom = async(classroomId:string)=>{
    const result = await Classroom.findById(classroomId).populate("faculty")
    if(!result){
        throw new Error("Classroom  not found!!!")
    }
    return result
}

const deleteClassroomFromDB = async(classroomId:string, user:JwtPayload)=>{
    const classroom = await Classroom.findById(classroomId).populate("faculty")
    if(!classroom){
        throw new Error("Classroom not found!!!")
    }
    if(classroom.faculty.id !== user.id){
        throw new Error("You are unauthorized to delete the Classroom")
    }
    const result = await Classroom.findByIdAndDelete(classroomId)
    return result
}



export const ClassroomService = {
    createClassroomIntoDB,
    getAllClassrooms,
    getASingleClassroom,
    deleteClassroomFromDB,
}