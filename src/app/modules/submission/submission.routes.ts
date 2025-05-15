import { Router } from "express";
import { SubmissionControllers } from "./submission.controller";
import { auth } from "../../middlewares/auth";
import { userRoles } from "../user/user.constant";

const router =  Router();

router.post('/',auth(userRoles.STUDENT), SubmissionControllers.submitAssignment )
router.get('/assignment-submissions/:assignmentId',auth(userRoles.FACULTY), SubmissionControllers.getAssignmentSubmissions )
router.get('/:submissionId',auth(userRoles.FACULTY, userRoles.STUDENT), SubmissionControllers.getASingleSubmission )
router.get('/my-submission/:assignmentId',auth(userRoles.STUDENT), SubmissionControllers.myAssignmentSubmission )  
router.patch('/evaluate-submission/:submissionId',auth(userRoles.FACULTY), SubmissionControllers.evaluateSubmission )            

export const SubmissionRoutes = router

