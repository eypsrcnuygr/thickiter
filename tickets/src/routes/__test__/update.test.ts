import request from "supertest";
import { app } from "../../app";
import mongoose from "mongoose";

it("return 404 if Ticket is not found", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", global.signin())
    .send({ title: "test", price: 20 })
    .expect(404);
});

it("return 401 if User is not the owner", async () => {
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title: "test", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", global.signin())
    .send({ title: "test", price: 20 })
    .expect(401);
});

it("return 401 if User is not authenticated", async () => {
  const id = new mongoose.Types.ObjectId().toHexString();
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({ title: "test", price: 20 })
    .expect(401);
});

it("return 400 if User provides invalid inputs", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "test", price: 20 })
    .expect(201);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 200,
    });
  expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "test",
      price: "",
    });
  expect(400);
});

it("return 200 if everything goes well and updates the ticket", async () => {
  const cookie = global.signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "test", price: 20 })
    .expect(201);

  const result = await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "updated title",
      price: 200,
    });
  expect(200);
  expect(result.body.title).toEqual("updated title");
  expect(result.body.price).toEqual(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .send();

  expect(ticketResponse.body.title).toEqual("updated title");
  expect(ticketResponse.body.price).toEqual(200);
});
