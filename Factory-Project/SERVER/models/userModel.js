import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    fullName: { type: String, required: true },
    numOfActions: { type: Number, required: true },
    remainingActions: {type: Number, required: true}
  },
  { versionKey: false }
);

const User = new model("User", schema);

export default User;
