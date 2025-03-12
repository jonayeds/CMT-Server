import { IClassroom } from "./classroom.interface"
import { Classroom } from "./classroom.model"

const createClassroomIntoDB = async(payload:IClassroom)=>{
    const isClassroomExists = await Classroom.isClassroomExists(payload.faculty, payload.courseTitle, payload.courseCode)
    if(isClassroomExists){
        throw new Error("Classroom already exist!!!")
    }
    payload.joiningCode = "abcd"
    const result = await Classroom.create(payload)
    return result
}

const getAllClassrooms = async()=>{
    const result = await Classroom.find().populate("faculty")
    return result
}

const getASingleClassroom = async(classroomId:string)=>{
    const result = await Classroom.findById(classroomId).populate("faculty")
    return result
}

const deleteClassroomFromDB = async(classroomId:string)=>{
    const result = await Classroom.findByIdAndDelete(classroomId)
    return result
}

export const ClassroomService = {
    createClassroomIntoDB,
    getAllClassrooms,
    getASingleClassroom,
    deleteClassroomFromDB,
}