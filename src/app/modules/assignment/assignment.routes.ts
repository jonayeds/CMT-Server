import { Router } from "express";
import { AssignmentControllers } from "./assignment.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { AssignmentValidations } from "./assignment.validation";
import { auth } from "../../middlewares/auth";
import { userRoles } from "../user/user.constant";

const router  = Router()

router.post('/', auth(userRoles.FACULTY), validateRequest(AssignmentValidations.createAssignmentValidationSchema), AssignmentControllers.createAssignment)
router.get('/:classroomId', auth(userRoles.STUDENT, userRoles.FACULTY), AssignmentControllers.getClassroomAssignments)
router.get('/single-assignment/:assignmentId', auth(userRoles.STUDENT, userRoles.FACULTY), AssignmentControllers.getASingleAssignment)    

export const AssignmentRoutes = router