import { Message } from "node-nats-streaming";
import { Listener, Subjects, TicketUpdatedEvent } from "@esuthickiter/common";
import { Ticket } from "../../models/ticket";
import { queueGroupName } from "./queue-group-name";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;

  queueGroupName: string = queueGroupName;

  async onMessage(
    data: { id: string; title: string; price: number; userId: string },
    msg: Message
  ): Promise<void> {
    const ticket = await Ticket.findById(data.id);
    const { title, price } = data;
    if (!ticket) {
      throw new Error("Ticket Not Found!");
    }

    ticket.set({ title, price });
    await ticket.save();

    msg.ack();
  }
}
