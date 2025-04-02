import { JwtPayload } from "jsonwebtoken"
import { Message } from "./message.model"
import { IMessage } from "./message.interface"
import { Chat } from "../chat/chat.model"
import { IClassroom } from "../classroom/classroom.interface"

const sendMessage = async(user:JwtPayload, payload:IMessage)=>{
    const isChatExist = await Chat.findOne({_id: payload.chat, isActive:true}).populate("classroom")
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
    payload.from = user.role

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
    const result = await Message.find({chat:chatId}).sort("-createdAt").limit(10)
    return result 
}

export const MessageServices = {
    sendMessage,
    getChatMessages
}