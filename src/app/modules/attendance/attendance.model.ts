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
        default:0
    },
    present:{
        type:Number,
        default:0
    },
    absent:{
        type:Number,
        default:0
    },
    late:{
        type:Number,
        default:0
    },
}, {timestamps:true})

export const Attendance = model<IAttendance>("Attendance", attendanceSchema)