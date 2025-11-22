import { model, Schema } from "mongoose";
import type { Iuser } from "../types/user.type.ts";
import { v4 as uuidv4 } from "uuid";

const userSchema = new Schema<Iuser>(
  {
    id: {
      type: String,
      default: uuidv4,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    googleId: { type: String },
    name: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["user", "admin"],
      default: "user",
    },
  },
  {
    timestamps: true,
  }
);

export const UserModel = model("User", userSchema);
