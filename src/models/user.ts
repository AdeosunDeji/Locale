import { Schema, model } from "mongoose";
import { IUser } from "../utils/interface";

const userSchema = new Schema(
  {
    email: {
      type: String, unique: true, maxlength: 50, trim: true, lowercase: true, required: true
    },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    api_key: { type: String },
    api_key_used: { type: Boolean, default: false}
  },
    { timestamps: true }
);

export default model<IUser>("User", userSchema);
