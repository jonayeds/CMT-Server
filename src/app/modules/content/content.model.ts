import { model, Schema } from "mongoose";
import { IContent } from "./content.interface";

const contentSchema = new Schema<IContent>({
    classroom:{
        type:Schema.ObjectId,
        ref:"Classroom",
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    description:{
        type:String,
    },
    contentFiles:{
        type:[String],
    },
    contentLinks:{
        type:[String],
    },
},{timestamps:true})

export const Content = model<IContent>("Content", contentSchema)