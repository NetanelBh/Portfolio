import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true },
    manager: { type: String, required: false },
  },
  { versionKey: false }
);

const Department = new model("Department", schema);

export default Department;
