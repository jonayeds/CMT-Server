import { JwtPayload } from "jsonwebtoken";
import { Chat } from "./chat.model";
import { Attendance } from "../attendance/attendance.model";
import { IClassroom } from "../classroom/classroom.interface";
import { Classroom } from "../classroom/classroom.model";
import { userRoles } from "../user/user.constant";
import mongoose from "mongoose";
import { closeChatSchedule, openChatSchedule } from "./chat.schedule";

const sendChatRequest = async (classroomId: string, user: JwtPayload) => {
  const isJoined = await Attendance.findOne({
    classroom: classroomId,
    student: user._id,
  });
  if (!isJoined) {
    throw new Error("You are not joined in this classroom");
  }

  const isRequestSent = await Chat.findOne({
    student: user._id,
    classroom: classroomId,
  }).sort("-createdAt");

  if (isRequestSent?.status === "pending") {
    throw new Error("You have already a pending request to this classroom");
  }
  if (isRequestSent?.isActive) {
    throw new Error("You have an Active chat with this classroom");
  }
  const now = new Date();
  if (isRequestSent) {
    const schedule = new Date(isRequestSent.schedule);
    if (now < schedule) {
      throw new Error("Already scheduled a Chat");
    }
  }
  const chat = {
    student: user._id,
    classroom: classroomId,
  };
  const result = await Chat.create(chat);
  return result;
};

const handleChatRequest = async (
  payload: { chatId: string; status: string; schedule?: string },
  user: JwtPayload
) => {
  if (payload.status === "accepted" && !payload.schedule) {
    throw new Error("Schedule is needed to accept request!!!");
  }
  const isChatExists = await Chat.findById(payload.chatId).populate(
    "classroom"
  );
  if (!isChatExists) {
    throw new Error("Chat request not found");
  }
  if (
    (isChatExists.classroom as unknown as IClassroom).faculty.toString() !==
    user._id.toString()
  ) {
    throw new Error("You are not authorized to handle this chat request");
  }
  if (
    isChatExists.status === "accepted" ||
    isChatExists.status === "rejected"
  ) {
    throw new Error("Chat request is already handled");
  }
  const result = await Chat.findByIdAndUpdate(isChatExists._id, payload, {
    new: true,
  });
  if( result && payload.status==="accepted" ){
    openChatSchedule(result._id.toString(), result.schedule)
    closeChatSchedule(result._id.toString(), result.schedule)
  }
  return result;
};

const getClassroomChatRequests = async (
  classroomId: string,
  user: JwtPayload
) => {
  const isClassroomExists = await Classroom.findById(classroomId);
  if (!isClassroomExists) {
    throw new Error("Classroom not found");
  }
  if (isClassroomExists.faculty.toString() !== user._id) {
    throw new Error(
      "You are not authorized to view this classroom's chat requests"
    );
  }
  const result = await Chat.find({ classroom: classroomId }).populate(
    "student classroom"
  );
  return result;
};

const getMyPendingChatRequests = async (user: JwtPayload) => {
  if (user.role === userRoles.STUDENT) {
    const result = await Chat.aggregate([
      {
        $match: {
          student: new mongoose.Types.ObjectId(user._id),
        },
      },
      {
        $lookup: {
          from: "classrooms",
          localField: "classroom",
          foreignField: "_id",
          as: "classroom",
          pipeline: [
            {
              $lookup: {
                from: "users",
                localField: "faculty",
                foreignField: "_id",
                as: "faculty",
                pipeline: [
                  {
                    $project: {
                      name: 1,
                      profileImage: 1,
                    },
                  },
                ],
              },
            },
            {
                $project:{
                    courseTitle:1,
                    courseCode:1,
                    faculty:1
                }
            },
            {
                $unwind:{
                    path:"$faculty"
                }
              }
          ],
        },
      },
      {
        $unwind:{
            path:"$classroom"
        }
      },
      {
        $replaceRoot:{
            newRoot:{
                $mergeObjects:[
                    "$$ROOT",
                    {faculty:"$classroom.faculty"},
                    {classroom: {courseTitle:"$classroom.courseTitle", courseCode:"$classroom.courseCode" } }
                ]
            }
        }
      },
    ]);
    return result;
  } else {
    const result = await Classroom.aggregate([
      {
        $match: {
          faculty: new mongoose.Types.ObjectId(user._id),
        },
      },
      {
        $lookup: {
          localField: "_id",
          foreignField: "classroom",
          from: "chats",
          as: "chatRequests",
        },
      },
      {
        $unwind: {
          path: "$chatRequests",
        },
      },
      {
        $replaceRoot: {
          newRoot: "$chatRequests",
        },
      },
      {
        $match: {
          status: "pending",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "student",
          foreignField: "_id",
          as: "student",
          pipeline: [
            {
              $project: {
                _id: 0,
                name: 1,
                id: 1,
                profileImage: 1,
              },
            },
          ],
        },
      },
      {
        $lookup: {
          from: "classrooms",
          localField: "classroom",
          foreignField: "_id",
          as: "classroom",
          pipeline: [
            {
              $project: {
                _id: 0,
                courseTitle: 1,
                courseCode: 1,
              },
            },
          ],
        },
      },
      {
        $unwind: {
          path: "$classroom",
        },
      },
      {
        $unwind: {
          path: "$student",
        },
      },
    ]);
    return result;
  }
};

const cancelChatrequest = async(chatId:string, user:JwtPayload)=>{
    const isChatExists = await Chat.findById(chatId)
    if(!isChatExists){
        throw new Error("Chat not found");
    }
    if(isChatExists.student.toString() !== user._id.toString()){
        throw new Error("You are not authorized to cancel this chat");
    }
    const result = await Chat.findByIdAndDelete(chatId)
    return result
}

const getMyChats = async(user:JwtPayload) =>{
  if(user.role === userRoles.STUDENT){
    const result = await Chat.aggregate([
      {
        $match:{
          student: new mongoose.Types.ObjectId(user._id),
          status:"accepted",
          isActive:true
        }
      },
      {
        $lookup:{
          from:"classrooms",
          localField:"classroom",
          foreignField:"_id",
          as:'classroom',
          pipeline:[
            {
              $project:{
                courseTitle:1,
                courseCode:1,
                faculty:1
              }
            },
            {
              $lookup:{
                from:"users",
                foreignField:"_id",
                localField:"faculty",
                as:"faculty",
                pipeline:[
                  {
                    $project:{
                      name:1,
                      profileImage:1,
                      email:1
                    }
                  }
                ]
              }
            },
            {
              $unwind:{
                path:"$faculty"
              }
            }
          ],
        }
      },
      {
        $unwind:{
          path:"$classroom"
        }
      }
    ]).sort("updatedAt")
    return result
  }else{
    const result = await Classroom.aggregate([
      {
        $match:{
          faculty: new mongoose.Types.ObjectId(user._id)
        }
      },
      {
        $lookup:{
          from:"chats",
          localField:"_id",
          foreignField:"classroom",
          as:"chat"
        }
      },
      {
        $unwind:{
          path:"$chat"
        }
      },
      {
        $replaceRoot:{
          newRoot:{
            $mergeObjects:[
              "$$ROOT",
              {classroom: {courseTitle:"$courseTitle", courseCode:"$courseCode"}}
            ]
          }
        }
      },
      {
        $project:{
          classroom:1,
          _id:0,
          chat:1,
        }
      },
      {
        $replaceRoot:{
          newRoot:{
            $mergeObjects:[
              "$chat",
              {classroom:"$classroom"}
            ]
          }
        }
      },
      {
        $match:{
          isActive:true,
          status:"accepted"
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
                name:1,
                id:1,
                profileImage:1
              }
            }
          ]
        }
      },
      {
        $unwind:{
          path:"$student"
        }
      }
      
    ])
    return result
  }

}


export const ChatService = {
  sendChatRequest,
  handleChatRequest,
  getClassroomChatRequests,
  getMyPendingChatRequests,
  cancelChatrequest,
  getMyChats
};
