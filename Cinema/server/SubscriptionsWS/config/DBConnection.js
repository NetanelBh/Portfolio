import mongoose from "mongoose";

const DbConnection = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/subscriptionsDB");
    console.log("Connected to subscriptionsDB");
  } catch (error) {
    console.log(error.message);
  }
};

export default DbConnection;
