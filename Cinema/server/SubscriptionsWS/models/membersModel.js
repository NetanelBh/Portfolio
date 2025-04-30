import { Schema, model } from "mongoose";

const schema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        city: { type: String, required: true },
    },
    { versionKey: false }
);

const MembersModel = new model('member', schema);

export default MembersModel;
