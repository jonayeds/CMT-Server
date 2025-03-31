import { model,  Schema } from "mongoose";
import { IMessage } from "./message.interface";

const messageSchema = new Schema<IMessage>({
    message:{
        type:String,
        required:true,
    },
    chat:{
        type:Schema.Types.ObjectId,
        ref:"Chat",
        required:true
    },
    from:{
        type:String,
        enum:["faculty", "student"]
    }
})

export const Message = model<IMessage>("Message", messageSchema)