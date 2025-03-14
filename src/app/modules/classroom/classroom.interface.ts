import { Model, Types } from "mongoose";

export type TDays = "Sunday" | "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday";
export interface IClassroom {
    faculty:Types.ObjectId;
    courseTitle:string;
    courseCode:string;
    joiningCode:string;
    classDays: TDays[]; 
    startTime:string;
    endTime:string;
}

export interface IClassroomModel extends Model<IClassroom>{
    isClassroomExists(faculty:Types.ObjectId, courseTitle:string, courseCode:string):Promise<IClassroom | null>
}