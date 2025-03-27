import { JwtPayload } from "jsonwebtoken";
import { CustomRequest } from "../../middlewares/auth";
import { catchAsync } from "../../utils/catchAsync";
import { AttendanceService } from "./attendance.service";

const updateAttendance = catchAsync(async(req:CustomRequest, res,next)=>{
    const {classroomId} = req.params;
    const user = req.user;
    const result = await AttendanceService.updateAttendance(classroomId, user as JwtPayload);
    res.status(200).json({
        success:true,
        message:"Attendance updated successfully",
        data:result
    })
})

const getMyAttendances = catchAsync(async(req:CustomRequest, res,next)=>{
    const user = req.user;
    const result = await AttendanceService.getMyAttendances( user as JwtPayload);
    res.status(200).json({
        success:true,
        message:"Fetched Attendances successfully",
        data:result
    })
})


export const AttendanceController = {
    updateAttendance,
    getMyAttendances
}