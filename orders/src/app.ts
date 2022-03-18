import express from "express";
import { json } from "body-parser";
import { errorHandler, NotFoundError, currentUser } from "@esuthickiter/common";
import cookieSession from "cookie-session";
import { newOrderRouter } from "./routes/new";
import { showOrderRouter } from "./routes/show";
import { indexOrderRouter } from "./routes";
import { deleteOrderRouter } from "./routes/delete";

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

app.use(currentUser);

app.use(newOrderRouter);
app.use(showOrderRouter);
app.use(indexOrderRouter);
app.use(deleteOrderRouter);

app.all("*", async (req, res, next) => {
  // Before async it was like throw new NotFoundError();
  // we are not throwing error because it is an async function so we are using next function abilities!
  next(new NotFoundError());
});

app.use(errorHandler);

export { app };
