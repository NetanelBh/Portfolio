import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    name: { type: String, required: true },
    genre: { type: Array, required: true },
    image: { type: String, required: true },
    premiered: { type: String, required: true },
  },
  { versionKey: false }
);

const moviesModel = new model("movie", schema);

export default moviesModel;
