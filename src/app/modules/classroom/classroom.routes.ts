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

router.get("/:classroomId", ClassroomController.getASingleClassroom);

router.get("/",ClassroomController.getAllClassrooms);

router.delete("/:classroomId",auth(userRoles.FACULTY), ClassroomController.deleteClassroom)

router.post("/join-classroom",  )

export const ClassroomRoutes = router;
