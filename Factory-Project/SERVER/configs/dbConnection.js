import mongoose from "mongoose";

const DbConnection = async () => {
  try {
    await mongoose.connect("mongodb://localhost:27017/NodeProjectDB");
    console.log("connected to NodeProjectDB");
  } catch (error) {
    console.log(error);
  }
};

export default DbConnection;