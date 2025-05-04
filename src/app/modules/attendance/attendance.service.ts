import { JwtPayload } from "jsonwebtoken";
import { Attendance } from "./attendance.model";
import { IClassroom, TDays } from "../classroom/classroom.interface";
import { IAttendanceResponse } from "./attendance.interface";
import { getClassStartedSince, getTimeDifference, isTimeBetween } from "./attendance.utils";
import moment from "moment-timezone";

const updateAttendance = async (classroomId: string, user: JwtPayload) => {
  const isJoined = await Attendance.findOne({
    classroom: classroomId,
    student: user._id,
  }).populate("classroom");
  if (!isJoined) {
    throw new Error("You are not joined in this classroom");
  }
  const { classDays, startTime, endTime } =
    isJoined.classroom as unknown as IClassroom;
  const { updatedAt, createdAt } = isJoined as unknown as IAttendanceResponse;
  const currentDate = moment().tz('Asia/Dhaka'); // or your desired timezone
const today = currentDate.format('dddd');

  const isClassDay = classDays.includes(today as TDays);
  if (!isClassDay) {
    throw new Error("Today is not a class day");
  }
  const timeDifference = getTimeDifference(updatedAt);

if(createdAt.getTime() !== updatedAt.getTime() && timeDifference< 2){
    throw new Error("You have already updated your attendance");
}

const isClassRunning = isTimeBetween(startTime, endTime);
if(!isClassRunning){
    throw new Error("Class is not running");
}

const startedSince = getClassStartedSince(startTime);
if(startedSince>15){
    const result = await Attendance.findByIdAndUpdate(isJoined._id, {
        $set:{
            late:isJoined.late+1,
        }
    },{new:true})
    return result;
}else{
    const result = await Attendance.findByIdAndUpdate(isJoined._id, {
        $set:{
            present:isJoined.present+1,
        }
    },{new:true})
    return result;
}

};


const getMyAttendances = async(user:JwtPayload)=>{
    const result  = await Attendance.find({student:user._id}).populate("classroom")
    return result
}

export const AttendanceService = {
  updateAttendance,
  getMyAttendances
};
