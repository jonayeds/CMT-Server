import { Types } from "mongoose";

export interface ISubmission {
    submissionFile:string;
    assignment:Types.ObjectId;
    student:Types.ObjectId;
    isLate:boolean;
    marks:number;
}