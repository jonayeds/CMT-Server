import { model, Schema } from "mongoose";
import { IClassroom } from "./classroom.interface";

const classroomSchema = new Schema<IClassroom>({
    courseTitle:{
        type:String,
        required:true,
    },
    courseCode:{
        type:String,
        required:true,
    },
    joiningCode:{
        type:String,
        required:true,
    },
    faculty:{
        type:Schema.Types.ObjectId,
        required:true
    }
},{
    timestamps:true
})

export const Classroom = model<IClassroom>("Classroom", classroomSchema)