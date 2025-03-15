import { Router } from "express";
import { ContentController } from "./content.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { ContentValidation } from "./content.validation";

const router = Router()

router.post("/", validateRequest(ContentValidation.createContentValidation) , ContentController.createContent)

export const ContentRoutes = router