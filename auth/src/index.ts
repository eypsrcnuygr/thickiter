import mongoose from "mongoose";
import { app } from "./app";

const startup = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be initialized!");
  }

  try {
    console.log("Connected to MongoDB!!");
    await mongoose.connect("mongodb://auth-mongo-srv:27017/auth-thickiter");
  } catch (err) {
    console.log(err);
  }
  app.listen(3000, () => {
    console.log("Listening on Port 3000!!!!");
  });
};

startup();
