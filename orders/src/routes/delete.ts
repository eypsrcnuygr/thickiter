import {
  NotAuthorizedError,
  NotFoundError,
  requireAuth,
} from "@esuthickiter/common";
import express, { NextFunction, Request, Response } from "express";
import { Order, OrderStatus } from "../models/order";

const router = express.Router();

router.delete(
  "/api/orders/:orderId",
  requireAuth,
  async (req: Request, res: Response, next: NextFunction) => {
    const { orderId } = req.params;

    const order = await Order.findById(orderId);

    if (!order) {
      return next(new NotFoundError());
    }

    if (order.userId !== req.currentUser!.id) {
      return next(new NotAuthorizedError());
    }

    order.status = OrderStatus.Cancelled;
    await order.save();

    //event publish needs to be done!!!!
    res.status(204).send(order);
  }
);

export { router as deleteOrderRouter };
