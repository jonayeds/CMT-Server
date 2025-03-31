import { Router } from "express";
import { auth } from "../../middlewares/auth";
import { userRoles } from "../user/user.constant";
import { MessageControllers } from "./message.controller";

const router = Router()

router.post("/send-message", auth(userRoles.FACULTY, userRoles.STUDENT), MessageControllers.sendMessage)
router.get("/:chatId", auth(userRoles.FACULTY, userRoles.STUDENT), MessageControllers.getChatMessage )

export const MessageRoutes = router