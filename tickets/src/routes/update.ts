import express, { NextFunction, Request, Response } from "express";
import { body } from "express-validator";
import {
  NotFoundError,
  validateRequest,
  requireAuth,
  NotAuthorizedError,
} from "@esuthickiter/common";
import { Ticket } from "../models/ticket";
import { TicketUpdatedPublisher } from "../events/publishers/ticket-updated-publisher";
import { natsWrapper } from "../nats-wrapper-singleton";

const router = express.Router();

router.put(
  "/api/tickets/:id",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required!"),
    body("price")
      .isFloat({ gt: 0 })
      .withMessage("Price must be greater than 0"),
  ],
  validateRequest,
  async (req: Request, res: Response, next: NextFunction) => {
    let ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      next(new NotFoundError());
    } else if (ticket.userId !== req.currentUser!.id) {
      next(new NotAuthorizedError());
    } else {
      ticket.set({
        title: req.body.title,
        price: req.body.price,
      });
      await ticket.save();

      new TicketUpdatedPublisher(natsWrapper.client).publish({
        id: ticket.id,
        title: ticket.title,
        price: ticket.price,
        userId: ticket.userId,
      });
      res.send(ticket);
    }
  }
);

export { router as updateTickerRouter };
