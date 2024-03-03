import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    startWorkYear: { type: Number, required: true },
    departmentId: { type: String, required: true },
  },
  { versionKey: false }
);

const Employee = new model("Employee", schema);

export default Employee;
