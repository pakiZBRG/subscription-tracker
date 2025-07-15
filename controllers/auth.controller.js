import mongoose from "mongoose";
import bcrpyt from "bcryptjs";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

import { JWT_SECRET, JWT_EXPIRES_IN } from "../config/env.js";
import User from "../models/User.model.js";

export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const doesUserExists = await User.findOne({ email });
    if (doesUserExists) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrpyt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );
    const token = jwt.sign({ userId: user[0]._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: { token, user: user[0] },
    });
  } catch (error) {
    await session.abortTransaction();
    next(error);
  } finally {
    session.endSession();
  }
};

export const signIn = async (req, res, next) => {
  const { name, email, password } = req.body;

  try {
    const user = await User.findOne({ $or: [{ email }, { name }] });
    if (!user) {
      const error = new Error("User is not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrpyt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign({ userId: user._id }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    });

    res.status(200).json({
      success: true,
      message: "User signed successfully",
      data: {
        token,
        user,
      },
    });
  } catch (error) {
    next(error);
  }
};

export const signOut = async (req, res) => {};
