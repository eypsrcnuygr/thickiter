import { Publisher, OrderCancelledEvent, Subjects } from "@esuthickiter/common";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
