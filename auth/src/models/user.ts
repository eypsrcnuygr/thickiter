import mongoose from "mongoose";

// An interface that describes the properties of the User
interface UserAttributes {
  email: string;
  password: string;
}

// An interface that describes what properties of the User Model has.
interface UserModel extends mongoose.Model<UserDoc> {
  build(attributes: UserAttributes): UserDoc;
}

// An interface that describes the properties of a User Document has
interface UserDoc extends mongoose.Document {
  email: string;
  password: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
});

// To make the Typescript and Mongoose work together
userSchema.statics.build = (attributes: UserAttributes) => {
  return new User(attributes);
};

// UserDoc and user model specifications are also for making typescript work!
const User = mongoose.model<UserDoc, UserModel>("User", userSchema);

export { User };
