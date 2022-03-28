import mongoose from "mongoose";
import { app } from "./app";
import { natsWrapper } from "./nats-wrapper-singleton";
import { TicketCreatedListener } from "./events/listeners/ticket-created-listener";
import { TicketUpdatedListener } from "./events/listeners/ticket-updated.listener";

const startup = async () => {
  if (!process.env.JWT_KEY) {
    throw new Error("JWT_KEY must be initialized!");
  }

  if (!process.env.MONGO_URI) {
    throw new Error("MONGO URI must be initialized!");
  }
  if (!process.env.NATS_CLIENT_ID) {
    throw new Error("You must provide Client Id!");
  }
  if (!process.env.NATS_URL) {
    throw new Error("You must provide Nats Url");
  }
  if (!process.env.NATS_CLUSTER_ID) {
    throw new Error("You must provide Nats Cluster ID");
  }

  try {
    await natsWrapper.connect(
      process.env.NATS_CLUSTER_ID,
      process.env.NATS_CLIENT_ID,
      process.env.NATS_URL
    );
    natsWrapper.client.on("close", () => {
      console.log("Nats connection closed!");
      process.exit();
    });
    process.on("SIGINT", () => natsWrapper.client.close());
    process.on("SIGTERM", () => natsWrapper.client.close());

    new TicketCreatedListener(natsWrapper.client).listen();
    new TicketUpdatedListener(natsWrapper.client).listen();

    console.log("Connected to MongoDB Orders!!");
    await mongoose.connect(process.env.MONGO_URI);
  } catch (err) {
    console.log(err);
  }
  app.listen(3000, () => {
    console.log("Listening on Port 3000!!!!");
  });
};

startup();
