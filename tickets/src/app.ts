import express from "express";
import { json } from "body-parser";
import { errorHandler, NotFoundError, currentUser } from "@esuthickiter/common";
import cookieSession from "cookie-session";
import { createTicketRouter } from "./routes/new";
import { showTicketRouter } from "./routes/show";
import { indexTicketRouter } from "./routes";

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

app.use(createTicketRouter);
app.use(showTicketRouter);
app.use(indexTicketRouter);

app.all("*", async (req, res, next) => {
  // Before async it was like throw new NotFoundError();
  // we are not throwing error because it is an async function so we are using next function abilities!
  next(new NotFoundError());
});

app.use(errorHandler);

export { app };
