import { model, Schema } from "mongoose";
import { IClassroom, IClassroomModel } from "./classroom.interface";

const classroomSchema = new Schema<IClassroom, IClassroomModel>({
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

// statics
classroomSchema.static("isClassroomExists", async function(faculty, courseTitle, courseCode) {
    const classroom = await Classroom.findOne({
        faculty,
        courseTitle,
        courseCode
    })
    if(classroom){
        return classroom
    }else{
        return null
    }
})


export const Classroom = model<IClassroom, IClassroomModel>("Classroom", classroomSchema)