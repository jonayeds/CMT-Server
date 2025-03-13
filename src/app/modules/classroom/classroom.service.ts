import { JwtPayload } from "jsonwebtoken"
import { IClassroom } from "./classroom.interface"
import { Classroom } from "./classroom.model"
import { User } from "../user/user.model"
import { Attendance } from "../attendance/attendance.model"

const createClassroomIntoDB = async(payload:IClassroom, user:JwtPayload)=>{
    const isClassroomExists = await Classroom.isClassroomExists(payload.faculty, payload.courseTitle, payload.courseCode)
    if(isClassroomExists){
        throw new Error("Classroom already exist!!!")
    }
    
        payload.faculty = user?._id
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
    const classroom = await Classroom.findById(classroomId)
    if(!classroom){
        throw new Error("Classroom not found!!!")
    }
    if(classroom.faculty.toString() !== user._id){
        throw new Error("You are unauthorized to delete the Classroom")
    }
    const result = await Classroom.findByIdAndDelete(classroomId)
    return result
}

const joinClassroom = async(joiningCode:string, user:JwtPayload)=>{
    const isClassroomExists = await Classroom.findOne({joiningCode})
    if(!isClassroomExists){
        throw new Error("Wrong Joining Code")
    }
    const isAttendanceExists = await Attendance.findOne({
        classroom:isClassroomExists._id,
        student:user._id
      })  
      if(isAttendanceExists){
        throw new Error("Already Joined this Classroom!!!")
      }
    const attendance = {
        classroom:isClassroomExists._id,
        student:user._id
    }
    const result = await Attendance.create(attendance)
    return result
}

const leaveClassroom = async(classroomId:string, user:JwtPayload)=>{
    const isAttendanceExists = await Attendance.findOne({classroom:classroomId, student:user._id})
    if(!isAttendanceExists){
        throw new Error("You are not in this classroom")
    }
    const result = await Attendance.findByIdAndDelete(isAttendanceExists._id)
    return result

}



export const ClassroomService = {
    createClassroomIntoDB,
    getAllClassrooms,
    getASingleClassroom,
    deleteClassroomFromDB,
    joinClassroom,
    leaveClassroom
}