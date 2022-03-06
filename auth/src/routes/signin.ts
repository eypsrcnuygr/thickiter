import express, { Response, Request, NextFunction } from "express";
import { body } from "express-validator";
import { Password } from "../helpers/password";
import { BadRequestError, validateRequest } from "@esuthickiter/common";
import { User } from "../models/user";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post(
  "/api/users/signin",
  [
    body("email").isEmail().withMessage("Email must be valid"),
    body("password")
      .trim()
      .notEmpty()
      .withMessage("You must supply a password"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      next(new BadRequestError("You need to supply valid credentials!"));
    } else {
      const isPasswordsMatch = await Password.compare(
        existingUser.password,
        password
      );
      if (!isPasswordsMatch) {
        next(new BadRequestError("You need to supply valid credentials!!!!"));
      } else {
        const userJWT = jwt.sign(
          {
            id: existingUser.id,
            email: existingUser.email,
          },
          process.env.JWT_KEY!
        );

        req.session = {
          jwt: userJWT,
        };
        res.status(200).send(existingUser);
      }
    }
  }
);

export { router as signinRoute };
