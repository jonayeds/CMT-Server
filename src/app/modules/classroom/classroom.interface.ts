import { Types } from "mongoose";

export interface IClassroom {
    faculty:Types.ObjectId;
    courseTitle:string;
    courseCode:string;
    joiningCode:string;
}