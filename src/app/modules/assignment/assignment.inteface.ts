import { Types } from "mongoose";

export interface IAssignment {
    classroom: Types.ObjectId;
    title:string;
    description:string;
    totalMarks: number;
    deadline:string;
}