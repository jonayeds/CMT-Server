import { Router } from "express";
import { ChatController } from "./chat.controller";
import { auth } from "../../middlewares/auth";
import { userRoles } from "../user/user.constant";
import { validateRequest } from "../../middlewares/validateRequest";
import { ChatValidation } from "./chat.validation";

const router = Router();

router.post(
  "/send-chat-request/:classroomId",
  auth(userRoles.STUDENT),
  ChatController.sendChatRequest
);
router.patch(
  "/handle-chat-request",
  validateRequest(ChatValidation.handleChatRequestValudationSchema),
  auth(userRoles.FACULTY),
  ChatController.handleChatRequest
);
router.get(
  "/chat-requests",
  auth(userRoles.FACULTY, userRoles.STUDENT),
  ChatController.getMyPendingChatRequests
);
router.get(
  "/classroom-chat-requests/:classroomId",
  auth(userRoles.FACULTY),
  ChatController.getClassroomChatRequests
);
router.delete(
  "/cancel-chat-request/:chatId",
  auth(userRoles.STUDENT),
  ChatController.cancelChatRequests
);


export const ChatRoutes = router;
