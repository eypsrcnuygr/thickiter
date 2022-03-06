import express from "express";
import { json } from "body-parser";
import { currentUserRouter } from "./routes/current-user";
import { signinRoute } from "./routes/signin";
import { signoutRoute } from "./routes/signout";
import { signupRoute } from "./routes/signup";
import { errorHandler, NotFoundError } from "@esuthickiter/common";
import cookieSession from "cookie-session";

const app = express();
// The app is proxied via ingress-nginx so we add this set-up
app.set("trust proxy", true);
app.use(json());
app.use(
  cookieSession({
    signed: false,
    secure: process.env.NODE_ENV !== "test",
  })
);

app.use(currentUserRouter);
app.use(signinRoute);
app.use(signoutRoute);
app.use(signupRoute);

app.all("*", async (req, res, next) => {
  // Before async it was like throw new NotFoundError();
  // we are not throwing error because it is an async function so we are using next function abilities!
  next(new NotFoundError());
});

app.use(errorHandler);

export { app };
