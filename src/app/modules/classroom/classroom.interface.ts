import { Model, Types } from "mongoose";

export interface IClassroom {
    faculty:Types.ObjectId;
    courseTitle:string;
    courseCode:string;
    joiningCode:string;
}

export interface IClassroomModel extends Model<IClassroom>{
    isClassroomExists(faculty:Types.ObjectId, courseTitle:string, courseCode:string):Promise<IClassroom | null>
}