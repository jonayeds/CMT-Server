import { JwtPayload } from "jsonwebtoken";
import { IClassroom } from "./classroom.interface";
import { Classroom } from "./classroom.model";
import { Attendance } from "../attendance/attendance.model";
import { userRoles } from "../user/user.constant";
import mongoose from "mongoose";
import { hasClassConflicts } from "./classroom.utils";
import { updateClassCountSchedule } from "../attendance/attendance.schedule";

const createClassroomIntoDB = async (payload: IClassroom, user: JwtPayload) => {
  const isClassroomExists = await Classroom.isClassroomExists(
    user._id,
    payload.courseTitle,
    payload.courseCode
  );
  if (isClassroomExists) {
    throw new Error("Classroom already exist!!!");
  }
  const existingClasses = await Classroom.find({ faculty: user._id }).select(
    "classDays startTime endTime"
  );
  const newSchedule = {
    classDays: payload.classDays,
    startTime: payload.startTime,
    endTime: payload.endTime,
  };
  const hasConflict = hasClassConflicts(newSchedule, existingClasses);
  if (hasConflict) {
    throw new Error("Classroom time slot is already taken");
  }

  payload.faculty = user?._id;
  while (true) {
    const joiningCode = Math.random().toString(36).substring(2, 6);
    const isJoiningCodeExists = await Classroom.findOne({ joiningCode });
    payload.joiningCode = joiningCode;
    if (!isJoiningCodeExists) break;
  }
  const result = await Classroom.create(payload);
  if (result) {
    updateClassCountSchedule(
      result._id.toString(),
      result.endTime,
      result.classDays
    );
  }
  return result;
};

const getAllClassrooms = async () => {
  const result = await Classroom.find().populate("faculty");
  return result;
};

const getASingleClassroom = async (classroomId: string, user:JwtPayload) => {
  const result = await Classroom.findById(classroomId).populate("faculty");
  if (!result) {
    throw new Error("Classroom  not found!!!");
  }
  if(user.role === userRoles.STUDENT){
    const isAttendanceExists = await Attendance.findOne({classroom:classroomId, student:user._id})
    if(!isAttendanceExists){
      throw new Error("You are not joined in this classroom")
    }
  }else if(user._id.toString() !== result.faculty._id.toString() ){
    throw new Error("You are not owner of this classroom")
  }
  return result;
};

const deleteClassroomFromDB = async (classroomId: string, user: JwtPayload) => {
  const classroom = await Classroom.findById(classroomId);
  if (!classroom) {
    throw new Error("Classroom not found!!!");
  }
  if (classroom.faculty.toString() !== user._id) {
    throw new Error("You are unauthorized to delete the Classroom");
  }
  const session = await mongoose.startSession()
  try {
    session.startTransaction()
    const deletedAttendance = await Attendance.deleteMany({classroom:classroomId})
    if(!deletedAttendance){
      throw new Error("Something went wrong")
    }
    const result = await Classroom.findByIdAndDelete(classroomId);
    if(!result){
      throw new Error("Something went wrong")
    }
    await session.commitTransaction()
    await session.endSession()
    return result;

  } catch (error) {
    await session.abortTransaction()
    await session.endSession()
    throw new Error("Something went wrong")
  }
};

const joinClassroom = async (joiningCode: string, user: JwtPayload) => {
  const isClassroomExists = await Classroom.findOne({ joiningCode });
  if (!isClassroomExists) {
    throw new Error("Wrong Joining Code");
  }
  const isAttendanceExists = await Attendance.findOne({
    classroom: isClassroomExists._id,
    student: user._id,
  });
  if (isAttendanceExists) {
    throw new Error("Already Joined this Classroom!!!");
  }
  const myClassrooms = await Attendance.aggregate([
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
        as: "classroomDetails",
      },
    },
    {
      $unwind: "$classroomDetails",
    },
    {
      $replaceRoot: {
        newRoot: "$classroomDetails",
      },
    },
    {
      $project: {
        _id: 0,
        classDays: 1,
        startTime: 1,
        endTime: 1,
      },
    },
  ]);
  const newSchedule = {
    classDays: isClassroomExists.classDays,
    startTime: isClassroomExists.startTime,
    endTime: isClassroomExists.endTime,
  };
  const hasClassConflict = hasClassConflicts(newSchedule, myClassrooms);
  if (hasClassConflict) {
    throw new Error("Classroom time slot is already taken");
  }
  const attendance = {
    classroom: isClassroomExists._id,
    student: user._id,
  };
  const result = await Attendance.create(attendance);
  return result;
};

const leaveClassroom = async (classroomId: string, user: JwtPayload) => {
  const isAttendanceExists = await Attendance.findOne({
    classroom: classroomId,
    student: user._id,
  });
  if (!isAttendanceExists) {
    throw new Error("You are not in this classroom");
  }
  const result = await Attendance.findByIdAndDelete(isAttendanceExists._id);
  return result;
};

const getMyClassrooms = async (user: JwtPayload) => {
  if (user.role === userRoles.STUDENT) {
    const result = await Attendance.aggregate([
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
          as: "classroomDetails",
        },
      },
      {
        $unwind: "$classroomDetails",
      },
      {
        $replaceRoot: {
          newRoot: "$classroomDetails",
        },
      },
      {
        $lookup: {
          from: "users",
          localField: "faculty",
          foreignField: "_id",
          as: "faculty",
        },
      },

      {
        $unwind: "$faculty",
      },
    ]);
    return result;
  } else if (user.role === userRoles.FACULTY) {
    const result = await Classroom.find({ faculty: user._id });
    return result;
  }
  return null;
};

const getClassroomStudents = async(classroomId:string, user:JwtPayload)=>{
  if(user.role === "student"){
    const isJoined = await Classroom.isJoinedClassroom(user._id, classroomId)
    if(!isJoined){
      throw new Error("Not joined in this classroom");
    }
  }else{
    const isClassroomExists = await Classroom.findOne({faculty:user._id, _id:classroomId})
    if(!isClassroomExists){
      throw new Error("Classroom does not exists!!!");
    }
  }
  const result = await Attendance.find({classroom:classroomId})
  return result
}

export const ClassroomService = {
  createClassroomIntoDB,
  getAllClassrooms,
  getASingleClassroom,
  deleteClassroomFromDB,
  joinClassroom,
  leaveClassroom,
  getMyClassrooms,
  getClassroomStudents
};
