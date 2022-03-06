import express, { NextFunction, Request, Response } from "express";
import { body, validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import { BadRequestError, validateRequest } from "@esuthickiter/common";
import { User } from "../models/user";

const router = express.Router();

router.post(
  "/api/users/signup",
  [
    body("email").isEmail().withMessage("Email must be valid!"),
    body("password")
      .trim()
      .isLength({ min: 4, max: 20 })
      .withMessage("Password length must be between 4 and 20!"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);

    const { email, password } = req.body;

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      // throw new BadRequestError("Email is in use!");
      // we are not throwing because it is an async function so we are using next function abilities!
      return next(new BadRequestError("Email is in use!"));
    } else {
      const user = User.build({ email, password });
      await user.save();

      const userJWT = jwt.sign(
        {
          id: user.id,
          email: user.email,
        },
        process.env.JWT_KEY!
      );

      req.session = {
        jwt: userJWT,
      };
      res.status(201).send(user);
    }
  }
);

export { router as signupRoute };
