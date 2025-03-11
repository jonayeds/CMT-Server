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

export const ClassroomService = {
    createClassroomIntoDB
}