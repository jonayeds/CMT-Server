import { Types } from "mongoose";

export interface IContent {
    classroom:Types.ObjectId;
    title:string;
    description:string;
    contentFiles:string[];
    contentLinks:string[];
}