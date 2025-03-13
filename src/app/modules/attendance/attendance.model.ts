import { model, Schema } from "mongoose";
import { IAttendance } from "./attendance.interface";

const attendanceSchema = new Schema<IAttendance>({
    classroom:{
        type:Schema.ObjectId,
        ref:"Classroom",
        required:true
    },
    student:{
        type:Schema.ObjectId,
        ref:"User",
        required:true,
    },
    classes:{
        type:Number,
        required:true
    },
    present:{
        type:Number,
        required:true
    },
    absent:{
        type:Number,
        required:true
    },
    late:{
        type:Number,
        required:true
    },
}, {timestamps:true})

export const Attendance = model<IAttendance>("Attendance", attendanceSchema)