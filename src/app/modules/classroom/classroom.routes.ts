import express from "express"
import { ClassroomController } from "./classroom.controller"

const router = express.Router()

router.post("/", ClassroomController.createClassroom )

export const ClassroomRoutes = router