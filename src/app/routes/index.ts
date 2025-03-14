import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { ClassroomRoutes } from "../modules/classroom/classroom.routes";
import { AttendanceRoutes } from "../modules/attendance/attendance.routes";

const router = express.Router();

const moduleRoutes = [
  {
    path: "/user",
    routes: UserRoutes,
  },
  {
    path: "/classroom",
    routes: ClassroomRoutes,
  },
  {
    path: "/attendance",
    routes: AttendanceRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
