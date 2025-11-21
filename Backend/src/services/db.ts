import mongoose from "mongoose";
import "dotenv/config";

export const connectdb = async () => {
  try {
    const mongodb_url = process.env.MONGODB_URI;
    if (!mongodb_url) {
      throw new Error("No database connection string is found");
    }

    await mongoose.connect(mongodb_url);
    console.log("Connected to the database");
  } catch (error) {
    throw new Error("Error connecting to the database");
  }
};
