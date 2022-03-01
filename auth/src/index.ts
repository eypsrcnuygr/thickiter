import express from "express";
import { json } from "body-parser";
import mongoose from "mongoose";
import { currentUserRouter } from "./routes/current-user";
import { signinRoute } from "./routes/signin";
import { signoutRoute } from "./routes/signout";
import { signupRoute } from "./routes/signup";
import { errorHandler } from "./middlewares/error-handlers";
import { NotFoundError } from "./errors/not-found-error";

const app = express();
app.use(json());

app.use(currentUserRouter);
app.use(signinRoute);
app.use(signoutRoute);
app.use(signupRoute);

app.all("*", async (req, res, next) => {
  // Before async it was like throw new NotFoundError();

  next(new NotFoundError());
});

app.use(errorHandler);

const startup = async () => {
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
