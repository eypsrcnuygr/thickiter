import request from "supertest";
import { app } from "../../app";

const createTicket = async () => {
  const title = "football";
  const price = 25;
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", global.signin())
    .send({ title, price })
    .expect(201);
};

it("fethes the all list", async () => {
  createTicket();
  createTicket();

  const indexResponse = await request(app)
    .get("/api/tickets")
    .send()
    .expect(200);

  expect(indexResponse.body.length).toEqual(2);
});
