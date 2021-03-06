import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// declare global {
//   var signin: () => Promise<string[]>;
// }

let mongo: any;
beforeAll(async () => {
  process.env.JWT_KEY = "asdfasd";
  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo.getUri();

  await mongoose.connect(mongoUri);
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  await mongo.stop();
  await mongoose.connection.close();
});

// global.signin = async () => {
//   const payload = {
//     id: "1lkjasdnlk",
//     email: "test@test.com",
//   };

//   const token = jwt.sign(payload, process.env.JWT_KEY!);

//   const session = { jwt: token };

//   const sessionJSON = JSON.stringify(session);

//   const base64 = Buffer.from(sessionJSON).toString("base64");

//   return [`session=${base64}`];
// };
