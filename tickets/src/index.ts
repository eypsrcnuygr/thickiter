import mongoose from "mongoose";
import { app } from "./app";

const startup = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be initialized!");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO URI must be initialized!");
  }

  try {
    console.log("Connected to MongoDB Tickets!!");
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log(err);
  }
  app.listen(3000, () => {
    console.log("Listening on Port 3000!!!!");
  });
};

startup();
