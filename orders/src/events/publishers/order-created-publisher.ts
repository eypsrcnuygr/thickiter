import { Publisher, OrderCreatedEvent, Subjects } from "@esuthickiter/common";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
