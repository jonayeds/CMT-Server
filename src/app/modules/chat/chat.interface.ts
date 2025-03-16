import { Types } from "mongoose";

export interface IChat {
    student:Types.ObjectId;
    status:'pending' | 'accepted' | 'rejected';
    classroom:Types.ObjectId;
    schedule:Date;
}