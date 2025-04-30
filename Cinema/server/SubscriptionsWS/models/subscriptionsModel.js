import { Schema, model } from "mongoose";

const schema = new Schema(
  {
    memberId: { type: String, required: true },
    // This field store all movies that the member watched and their date.
    // Each array element: {movieId: movie_id, date: watched_data}
    movies: { type: Array, required: true },
  },
  { versionKey: false }
);

const SubscriptionModel = new model("subscription", schema);

export default SubscriptionModel;
