import { Router } from "express";

import authorize from "../middleware/auth.middleware.js";
import {
  createSubscription,
  deleteSubscription,
  getSubscription,
  getSubscriptions,
  getUserSubscriptions,
  updateSubscription,
} from "../controllers/subscriptions.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", getSubscriptions);

subscriptionRouter.get("/:id", authorize, getSubscription);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", authorize, updateSubscription);

subscriptionRouter.delete("/:id", authorize, deleteSubscription);

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ message: "Cancel a subscription" });
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ message: "GET upcoming renewals" });
});

export default subscriptionRouter;
