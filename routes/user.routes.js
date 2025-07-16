import { Router } from "express";

import authorize from "../middleware/auth.middleware.js";
import {
  deleteUser,
  getUser,
  getUsers,
  updateUser,
} from "../controllers/user.controller.js";
import { validateUser } from "../middleware/validation.middleware.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.put("/:id", authorize, validateUser, updateUser);

userRouter.delete("/:id", authorize, deleteUser);

export default userRouter;
