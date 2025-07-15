import { Router } from "express";
import { signIn, signOut, register } from "../controllers/auth.controller.js";

const authRouter = Router();

authRouter.post("/register", register);

authRouter.post("/sign-in", signIn);

authRouter.post("/sign-out", signOut);

export default authRouter;
