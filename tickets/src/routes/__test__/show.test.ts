import { response } from "express";
import request from "supertest";
import { app } from "../../app";

it("returns a 404 if the ticket is not found", async () => {
  const response = await request(app)
    .get("/api/tickets/6224f6ca99a477d94b5dc708")
    .send()
    .expect(404);
});

it("return the ticket with a successful request", async () => {
  const title = "football";
  const price = 25;
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(title);
  expect(ticketResponse.body.price).toEqual(price);
});
