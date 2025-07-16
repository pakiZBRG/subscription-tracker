import { Router } from "express";

import {
  validateUser,
  validLogin,
} from "../middleware/validation.middleware.js";
import { signIn, register } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", validateUser, register);

authRouter.post("/sign-in", validLogin, signIn);

export default authRouter;
