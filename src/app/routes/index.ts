import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { ClassroomRoutes } from "../modules/classroom/classroom.routes";

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
];

moduleRoutes.forEach((route) => router.use(route.path, route.routes));

export default router;
