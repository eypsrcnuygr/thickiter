import { Publisher, Subjects, TicketUpdatedEvent } from "@esuthickiter/common";

export class TicketUpdatedPublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
