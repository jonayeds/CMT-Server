import { Types } from "mongoose";

export interface IAttendance {
    classroom:Types.ObjectId;
    classes:number;
    present:number;
    absent:number;
    late:number;
    student:Types.ObjectId;
}

export interface IAttendanceResponse extends IAttendance {
    _id:Types.ObjectId;
    createdAt:Date;
    updatedAt:Date;
}
