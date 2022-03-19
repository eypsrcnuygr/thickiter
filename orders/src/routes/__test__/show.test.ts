import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it("gets the order", async () => {
  const ticket = Ticket.build({
    title: "sport",
    price: 38,
  });

  await ticket.save();

  const user = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);
});

it("just returns the current users orders and return 401", async () => {
  const ticket = Ticket.build({
    title: "sport",
    price: 38,
  });

  await ticket.save();

  const user = global.signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", global.signin())
    .send()
    .expect(401);
});
