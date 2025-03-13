import express from "express";
import { ClassroomController } from "./classroom.controller";
import { ClassroomValidation } from "./classroom.validation";
import { validateRequest } from "../../middlewares/validateRequest";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  validateRequest(ClassroomValidation.createClassroomSchema),
  ClassroomController.createClassroom
);

router.get("/:classroomId", ClassroomController.getASingleClassroom);

router.get("/", auth() ,ClassroomController.getAllClassrooms);

router.delete("/:classroomId", ClassroomController.deleteClassroom)

export const ClassroomRoutes = router;
