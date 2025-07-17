import express from "express";
import cookieParser from "cookie-parser";
import helmet from "helmet";

import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import authRouter from "./routes/auth.routes.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectToDB from "./database/mongodb.js";
import errorMiddleware from "./middleware/error.middleware.js";
import arcjetMiddleware from "./middleware/arcjet.middleware.js";
import workflowRouter from "./routes/workflow.routes.js";

const app = express();

// 1. Global middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(helmet());
app.use(arcjetMiddleware);

// 2. Route middleware
app.use("/api/v1/auth", authRouter);
app.use("/api/v1/users", userRouter);
app.use("/api/v1/subscriptions", subscriptionRouter);
app.use("/api/v1/workflows", workflowRouter);

// 3. Error handling middleware
app.use(errorMiddleware);

app.get("/", (req, res) => {
  res.send("<h2>Subscription Tracker API<h2>");
});

app.listen(PORT, async () => {
  console.log(`Listening on port ${PORT}`);

  await connectToDB();
});

export default app;
