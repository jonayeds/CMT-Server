import express from "express";
import { UserControllers } from "./user.controller";
import { validateRequest } from "../../middlewares/validateRequest";
import { UserValidations } from "./user.validation";

const router = express.Router();

router.post(
  "/register-user",
  validateRequest(UserValidations.registerUserValidation),
  UserControllers.registerUser
);

export const UserRoutes = router;
