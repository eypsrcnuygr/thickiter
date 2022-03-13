import { Publisher, Subjects, TicketCreatedEvent } from "@esuthickiter/common";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
