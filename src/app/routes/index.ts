import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { ClassroomRoutes } from "../modules/classroom/classroom.routes";
import { AttendanceRoutes } from "../modules/attendance/attendance.routes";
import { ContentRoutes } from "../modules/content/content.routes";
import { ChatRoutes } from "../modules/chat/chat.routes";
import { MessageRoutes } from "../modules/message/message.routes";
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
  {
    path: "/content",
    routes: ContentRoutes,
  },
  {
    path: "/chat",
    routes: ChatRoutes,
  },
  {
    path: "/message",
    routes: MessageRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
