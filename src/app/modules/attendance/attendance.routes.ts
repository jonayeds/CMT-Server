import { Router } from "express";
import { AttendanceController } from "./attendance.controller";
import { userRoles } from "../user/user.constant";
import { auth } from "../../middlewares/auth";

const router = Router();

router.patch("/update-attendance/:classroomId", auth(userRoles.STUDENT), AttendanceController.updateAttendance);
router.get("/my-attendances", auth(userRoles.STUDENT), AttendanceController.getMyAttendances);

export const AttendanceRoutes = router;
