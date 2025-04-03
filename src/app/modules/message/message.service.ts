import { JwtPayload } from "jsonwebtoken"
import { Message } from "./message.model"
import { IMessage } from "./message.interface"
import { Chat } from "../chat/chat.model"
import { IClassroom } from "../classroom/classroom.interface"
import { isValidObjectId } from "mongoose"

const sendMessage = async( payload:IMessage)=>{
    const isChatExist = await Chat.findOne({_id: payload.chat, isActive:true}).populate("classroom")
    if(!isChatExist){
        throw new Error("Chat not found!!!")
    }

    // if(user.role === "student"){
    //     if( user._id.toString() !== isChatExist.student.toString() ){
    //         throw new Error("You are not in this chat");
    //     }
    // }else{
    //     if(user._id.toString() !== (isChatExist.classroom as unknown as IClassroom).faculty.toString()){
            
    //         throw new Error("You are not in this chat");
    //     }
    // }
    // payload.from = user.role

    const result = await Message.create(payload)
    return result
}

const getChatMessages =async (chatId:string, user:JwtPayload)=>{
    const isChatExist = await Chat.findOne({_id: chatId, isActive:true}).populate("classroom")
    if(!isChatExist){
        throw new Error("Chat not found!!!")
    }
    if(user.role === "student"){
        if( user._id.toString() !== isChatExist.student.toString() ){
            throw new Error("You are not in this chat");
        }
    }else{
        if(user._id.toString() !== (isChatExist.classroom as unknown as IClassroom).faculty.toString()){
            throw new Error("You are not in this chat");
        }
    }
    if(!isValidObjectId(chatId)){
        throw new Error("Invalid object id");
        
    }
    const result = await Message.find({chat:chatId}).sort({createdAt:-1}).limit(20)
    return result 
}

export const MessageServices = {
    sendMessage,
    getChatMessages
}