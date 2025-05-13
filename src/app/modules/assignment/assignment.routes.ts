import { Router } from "express";
import { AssignmentControllers } from "./assignment.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { AssignmentValidations } from "./assignment.validation";
import { auth } from "../../middlewares/auth";
import { userRoles } from "../user/user.constant";

const router  = Router()

router.post('/', auth(userRoles.FACULTY), validateRequest(AssignmentValidations.createAssignmentValidationSchema), AssignmentControllers.createAssignment)

export const AssignmentRoutes = router