import { model, Schema } from "mongoose";
import { IChat } from "./chat.interface";

const chatSchema = new Schema<IChat>({
    student:{
        type:Schema.Types.ObjectId,
        ref:"User",
        required:true
    },
    status:{
        type:String,
        enum:["pending","accepted","rejected"],
        default:"pending"
    },
    classroom:{
        type:Schema.Types.ObjectId,
        ref:"Classroom",
        required:true
    },
    schedule:{
        type:Date,
        required:true
    }
},{
    timestamps:true
})

export const Chat = model<IChat>("Chat", chatSchema)



