import { Router } from "express";
import { ContentController } from "./content.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { ContentValidation } from "./content.validation";
import { auth } from "../../middlewares/auth";
import { userRoles } from "../user/user.constant";

const router = Router()

router.post("/", validateRequest(ContentValidation.createContentValidation), auth(userRoles.FACULTY) , ContentController.createContent)
router.get("/classroom/:classroomId", auth(userRoles.STUDENT, userRoles.FACULTY), ContentController.getClassroomContents)
router.delete("/:contentId", auth(userRoles.FACULTY), ContentController.deleteContent)
router.get("/:contentId", auth(userRoles.STUDENT, userRoles.FACULTY), ContentController.getASingleContent)
export const ContentRoutes = router