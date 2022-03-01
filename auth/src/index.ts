import express from "express";
import { json } from "body-parser";
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

app.listen(3000, () => {
  console.log("Listening on Port 3000!!!!");
});
