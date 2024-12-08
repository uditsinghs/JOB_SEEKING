import mongoose from "mongoose";

export const connectDB = async (req, res) => {
  const MONGODB_URL = process.env.MONGODB_URI;
  try {
    await mongoose.connect(MONGODB_URL);
    console.log("connected to db");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
