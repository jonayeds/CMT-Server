import { JwtPayload } from "jsonwebtoken";
import { Chat } from "./chat.model";
import { Attendance } from "../attendance/attendance.model";
import { IClassroom } from "../classroom/classroom.interface";
import { Classroom } from "../classroom/classroom.model";
import { userRoles } from "../user/user.constant";
import mongoose from "mongoose";

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

const handleChatRequest = async (payload:{chatId:string, status:string, schedule?:string}, user: JwtPayload) => {
    if(payload.status ==="accepted" && !payload.schedule ){
        throw new Error("Schedule is needed to accept request!!!");
        
    }
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
    // const result = await Chat.findByIdAndUpdate(isChatExists._id, {status:payload.status}, {new:true})
    // return result
    return {}
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

const getMyPendingChatRequests = async(user:JwtPayload)=>{
    if(user.role === userRoles.STUDENT){
        const result = await Chat.find({student:user._id, status:"pending"})
        return result
    }else{
        const result = await Classroom.aggregate([
            {
                $match:{
                    faculty: new mongoose.Types.ObjectId(user._id),
                }
            },
            {
                $lookup:{
                    localField:"_id",
                    foreignField:"classroom",
                    from:"chats",
                    as:"chatRequests",
                },
            },
            {
                $unwind:{
                    path:"$chatRequests"
                }
            },
            {
                $replaceRoot:{
                    newRoot:"$chatRequests"
                }
            },
            {
                $match:{
                    status:"pending"
                }
            },
            {
                $lookup:{
                    from:"users",
                    localField:"student",
                    foreignField:"_id",
                    as:"student",
                    pipeline:[
                        {
                            $project:{
                                _id:0,
                                name:1,
                                id:1,
                                profileImage:1,
                            }
                        }
                    ]
                }
            },
            {
                $lookup:{
                    from:"classrooms",
                    localField:"classroom",
                    foreignField:"_id",
                    as:"classroom",
                    pipeline:[
                        {
                            $project:{
                                _id:0,
                                courseTitle:1,
                                courseCode:1
                            }
                        }
                    ]
                }
            },
            {
                $unwind:{
                    path:"$classroom"
                }
            },
            {
                $unwind:{
                    path:"$student"
                }
            },
        ])
        return result
    }
}

export const ChatService = {
  sendChatRequest,
  handleChatRequest,
  getClassroomChatRequests,
  getMyPendingChatRequests
};
