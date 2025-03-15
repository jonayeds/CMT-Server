import { Types } from "mongoose";

export interface IContent {
    classroom:Types.ObjectId;
    title:string;
    description:string;
    contentFile:string;
    contentLink:string;
}