import request from "supertest";
import { app } from "../../app";

it("sets a cookie after successful signup", async () => {
  const response = await request(app)
    .post("/api/users/signup")
    .send({ email: "test@test.com", password: "password" })
    .expect(201);

  expect(response.get("Set-Cookie")).toBeDefined();

  const cookie = response.get("Set-Cookie");

  const secondResponse = await request(app)
    .get("/api/users/current_user")
    .set("Cookie", cookie)
    .send();
  expect(200);
  expect(secondResponse.body["currentUser"]).toHaveProperty(
    "email",
    "test@test.com"
  );
});
