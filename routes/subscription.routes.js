import { Router } from "express";

import authorize from "../middleware/auth.middleware.js";
import {
  createSubscription,
  getSubscription,
  getSubscriptions,
  getUserSubscriptions,
} from "../controllers/subscriptions.controller.js";

const subscriptionRouter = Router();

subscriptionRouter.get("/", getSubscriptions);

subscriptionRouter.get("/:id", authorize, getSubscription);

subscriptionRouter.post("/", authorize, createSubscription);

subscriptionRouter.put("/:id", (req, res) => {
  res.send({ message: "Update subscription" });
});

subscriptionRouter.delete("/:id", (req, res) => {
  res.send({ message: "Delete subscription" });
});

subscriptionRouter.get("/user/:id", authorize, getUserSubscriptions);

subscriptionRouter.put("/:id/cancel", (req, res) => {
  res.send({ message: "Cancel a subscription" });
});

subscriptionRouter.get("/upcoming-renewals", (req, res) => {
  res.send({ message: "GET upcoming renewals" });
});

export default subscriptionRouter;
