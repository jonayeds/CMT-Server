import { IClassroom } from "./classroom.interface"
import { Classroom } from "./classroom.model"

const createClassroomIntoDB = async(payload:IClassroom)=>{
    
    const result = await Classroom.create(payload)
    return result
}

export const ClassroomService = {
    createClassroomIntoDB
}