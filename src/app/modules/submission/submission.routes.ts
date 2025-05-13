import { Router } from "express";
import { SubmissionControllers } from "./submission.controller";
import { auth } from "../../middlewares/auth";
import { userRoles } from "../user/user.constant";

const router =  Router();

router.post('/',auth(userRoles.STUDENT), SubmissionControllers.submitAssignment )
router.get('/assignment-submissions/:assignmentId',auth(userRoles.FACULTY), SubmissionControllers.getAssignmentSubmissions )
router.get('/:submissionId',auth(userRoles.FACULTY, userRoles.STUDENT), SubmissionControllers.getASingleSubmission )

export const SubmissionRoutes = router

