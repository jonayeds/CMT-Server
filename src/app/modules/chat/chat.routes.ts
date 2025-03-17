import { Router } from "express";
import { ChatController } from "./chat.controller";
import { auth } from "../../middlewares/auth";
import { userRoles } from "../user/user.constant";
import { validateRequest } from "../../middlewares/validateRequest";
import { ChatValidation } from "./chat.validation";

const router = Router()

router.post("/send-chat-request/:classroomId",auth(userRoles.STUDENT), ChatController.sendChatRequest)
router.patch("/handle-chat-request", validateRequest(ChatValidation.handleChatRequestValudationSchema),auth(userRoles.FACULTY), ChatController.handleChatRequest)
export const ChatRoutes = router