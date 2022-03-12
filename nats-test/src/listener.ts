import nats, { Message } from "node-nats-streaming";
import { randomBytes } from "crypto";

const stan = nats.connect("thickiter", randomBytes(4).toString("hex"), {
  url: "http://localhost:4222",
});

stan.on("connect", () => {
  console.log("Listener connected to Nats");

  const options = stan.subscriptionOptions().setManualAckMode(true);
  const subscription = stan.subscribe(
    "ticket:created",
    "orders-service-queue-group",
    options
  );

  subscription.on("message", (msg: Message) => {
    console.log("Message received!");
    const data = msg.getData();

    if (typeof data === "string") {
      console.log(`Received event ${msg.getSequence()} with data ${data}`);
    }

    msg.ack();
  });
});
