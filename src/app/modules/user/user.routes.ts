import express from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";
import { userRoles } from "./user.constant";
import { auth } from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/register-user",
  validateRequest(UserValidations.registerUserValidation),
  UserControllers.registerUser
);

router.post(
  "/login-user",
  validateRequest(UserValidations.loginUserValidationSchema),
  UserControllers.loginUser
);

router.get(
  "/me",
  auth(userRoles.STUDENT, userRoles.FACULTY),
  UserControllers.getMe
);

export const UserRoutes = router;
