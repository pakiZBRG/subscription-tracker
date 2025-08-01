import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  throw new Error(
    `Please define MONGO_URI environemnt variables inside .env.${NODE_ENV}.local`
  );
}

const connectToDB = async () => {
  try {
    await mongoose.connect(DB_URI);

    console.log(`Connected to database in ${NODE_ENV}`);
  } catch (err) {
    console.log("Error connecting to database: ", err);
    process.exit(1);
  }
};

export default connectToDB;
