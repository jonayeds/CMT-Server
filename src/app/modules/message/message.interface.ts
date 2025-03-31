import { Types } from "mongoose";

export interface IMessage {
    chat:Types.ObjectId;
    message:string;
    from:"faculty"| "student";   
}