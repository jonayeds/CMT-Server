import { JwtPayload } from "jsonwebtoken";
import { Chat } from "./chat.model";
import { Attendance } from "../attendance/attendance.model";
import { IClassroom } from "../classroom/classroom.interface";
import { Classroom } from "../classroom/classroom.model";

const sendChatRequest = async (classroomId: string, user: JwtPayload) => {
    const isJoined = await Attendance.findOne({classroom:classroomId, student:user._id})
    if(!isJoined){
        throw new Error("You are not joined in this classroom")
    }
    const isRequestSent = await Chat.findOne({student:user._id, classroom:classroomId})
    if(isRequestSent){
        throw new Error("You have already sent a request to this classroom")
    }
  const chat = {
    student:user._id,
    classroom:classroomId,
  };
  const result = await Chat.create(chat);
  return result;
};

const handleChatRequest = async (payload:{chatId:string, status:string}, user: JwtPayload) => {
    const isChatExists = await Chat.findById(payload.chatId).populate("classroom")
    if(!isChatExists){
        throw new Error("Chat request not found")
    }
    if((isChatExists.classroom as unknown as IClassroom).faculty.toString() !== user._id.toString()){
        throw new Error("You are not authorized to handle this chat request")
    }
    if(isChatExists.status === "accepted" || isChatExists.status === "rejected"){
        throw new Error("Chat request is already handled")
    }
    const result = await Chat.findByIdAndUpdate(isChatExists._id, {status:payload.status}, {new:true})
    return result
}

const getClassroomChatRequests = async(classroomId:string, user:JwtPayload) => {
    const isClassroomExists = await Classroom.findById(classroomId)
    if(!isClassroomExists){
        throw new Error("Classroom not found")
    }
    if(isClassroomExists.faculty.toString() !== user._id){
        throw new Error("You are not authorized to view this classroom's chat requests")
    }
    const result = await Chat.find({classroom:classroomId}).populate("student classroom")
    return result
}   

export const ChatService = {
  sendChatRequest,
  handleChatRequest,
  getClassroomChatRequests
};
