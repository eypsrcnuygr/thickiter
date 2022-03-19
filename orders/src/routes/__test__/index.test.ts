import request from "supertest";
import { app } from "../../app";
import { Order } from "../../models/order";
import { Ticket } from "../../models/ticket";

const buildTicket = async () => {
  const ticket = Ticket.build({
    title: "sport",
    price: 38,
  });

  await ticket.save();
  return ticket;
};

it("fetches current users orders", async () => {
  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();

  const userOne = global.signin();
  const userTwo = global.signin();

  const { body: orderOne } = await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  const { body: orderTwo } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketTwo.id })
    .expect(201);

  await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketThree.id })
    .expect(201);

  const response = await request(app)
    .get("/api/orders")
    .set("Cookie", userTwo)
    .expect(200);

  expect(response.body.length).toEqual(2);
  expect(response.body[0]).toEqual(orderTwo);
  expect(response.body[0].ticket.id).toEqual(ticketTwo.id);
  expect(response.body[0]).not.toEqual(orderOne);
  expect(response.body[0].ticket.id).not.toEqual(ticketOne.id);
});
