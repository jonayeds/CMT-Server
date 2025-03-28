import express from "express";
import { ClassroomController } from "./classroom.controller";
import { ClassroomValidation } from "./classroom.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";
import { userRoles } from "../user/user.constant";

const router = express.Router();

router.post(
  "/",
  auth(userRoles.FACULTY),
  validateRequest(ClassroomValidation.createClassroomSchema),
  ClassroomController.createClassroom
);

router.get(
  "/my-classrooms",
  auth(userRoles.STUDENT,userRoles.FACULTY),
  ClassroomController.getMyClassrooms
);

router.get("/:classroomId",auth(userRoles.FACULTY, userRoles.STUDENT), ClassroomController.getASingleClassroom);

router.get("/", ClassroomController.getAllClassrooms);

router.delete(
  "/:classroomId",
  auth(userRoles.FACULTY),
  ClassroomController.deleteClassroom
);

router.post(
  "/join-classroom",
  auth(userRoles.STUDENT),
  ClassroomController.joinClassroom
);

router.delete(
  "/leave-classroom/:classroomId",
  auth(userRoles.STUDENT),
  ClassroomController.leaveClassroom
);

router.delete(
  "/remove-student",
  auth(userRoles.FACULTY),
  ClassroomController.removeStudentFromClassroom
);

router.get("/get-students/:classroomId", auth(userRoles.FACULTY, userRoles.STUDENT), ClassroomController.getClassroomStudents)

export const ClassroomRoutes = router;
