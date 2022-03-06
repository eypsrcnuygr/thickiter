import express, { NextFunction, Request, Response } from "express";
import { NotFoundError } from "@esuthickiter/common";
import { Ticket } from "../models/ticket";

const router = express.Router();

router.get(
  "/api/tickets/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    const ticket = await Ticket.findById(req.params.id);

    if (!ticket) {
      next(new NotFoundError());
    } else {
      res.send(ticket);
    }
  }
);

export { router as showTicketRouter };
