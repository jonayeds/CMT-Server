import { Types } from "mongoose";

export interface IAttendance {
    classroom:Types.ObjectId;
    classes:number;
    present:number;
    absent:number;
    late:number;
    student:Types.ObjectId;
}
