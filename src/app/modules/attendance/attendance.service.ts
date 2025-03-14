import { JwtPayload } from "jsonwebtoken";
import { Attendance } from "./attendance.model";
import { IClassroom, TDays } from "../classroom/classroom.interface";
import { IAttendanceResponse } from "./attendance.interface";
import { getTimeDifference, isTimeBetween } from "./attendance.utils";

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
  const currentDate = new Date();
  const currentDay = currentDate.toLocaleDateString("en-US", {
    weekday: "long",
  });
  const isClassDay = classDays.includes(currentDay as TDays);
  if (!isClassDay) {
    throw new Error("Today is not a class day");
  }
  const timeDifference = getTimeDifference(startTime, updatedAt);

if(createdAt.getTime() !== updatedAt.getTime() && timeDifference< 2){
    throw new Error("You have already updated your attendance");
}

const isClassRunning = isTimeBetween(startTime, endTime);
if(!isClassRunning){
    throw new Error("Class is not running");
}

  return {
    classDays,
    startTime,
    endTime,
    currentDay,
  };
};

export const AttendanceService = {
  updateAttendance,
};
