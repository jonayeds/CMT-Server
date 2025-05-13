import { model, Schema } from "mongoose";
import { IAssignment } from "./assignment.inteface";

const assignmentSchema = new Schema<IAssignment>({
    classroom:{
        type:Schema.Types.ObjectId,
        ref:"Classroom",
        required:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
    },
    totalMarks:{
        type:Number,
        required:true
    },
    deadline:{
        type:String,
        required:true
    }
},{
    timestamps:true
})


export const Assignment = model<IAssignment>('Assignment', assignmentSchema)