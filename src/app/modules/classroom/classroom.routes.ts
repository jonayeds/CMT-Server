import express from "express"
import { ClassroomController } from "./classroom.controller"
import { ClassroomValidation } from "./classroom.validation"
import { validateRequest } from "../../middlewares/validateRequest"

const router = express.Router()

router.post("/", validateRequest(ClassroomValidation.createClassroomSchema), ClassroomController.createClassroom )

export const ClassroomRoutes = router