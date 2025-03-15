import { Router } from "express";
import { ContentController } from "./content.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { ContentValidation } from "./content.validation";
import { auth } from "../../middlewares/auth";
import { userRoles } from "../user/user.constant";

const router = Router()

router.post("/", validateRequest(ContentValidation.createContentValidation), auth(userRoles.FACULTY) , ContentController.createContent)

export const ContentRoutes = router