import { Router } from "express";

import authorize from "../middleware/auth.middleware.js";
import { getUser, getUsers } from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", getUsers);

userRouter.get("/:id", authorize, getUser);

userRouter.put("/:id", (req, res) => {
  res.send({
    message: "PUT user",
  });
});

userRouter.delete("/:id", (req, res) => {
  res.send({
    message: "DELETE user",
  });
});

export default userRouter;
