import mongoose from "mongoose";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "User name is required"],
      trim: true,
      minLength: 4,
      maxLength: 50,
    },
    email: {
      type: String,
      require: [true, "User email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      match: [
        /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        "Please enter a valid email address",
      ],
    },
    password: {
      type: String,
      required: [true, "User password is required"],
      minLength: 8,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
