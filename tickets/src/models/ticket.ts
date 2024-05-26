import mongoose from 'mongoose';

interface TicketAttrs {
  title: string;
  price: number;
  userId: string;
}

const ticketSchema = new mongoose.Schema({
  title: { type: String, required: true },
  price: { type: Number, required: true },
  userId: { type: String, required: true },
});

ticketSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString();
    delete returnedObject._id;
    delete returnedObject.__v;
  },
});

const Ticket = mongoose.model('Ticket', ticketSchema);

const build = (attrs: TicketAttrs) => {
  return new Ticket(attrs);
};

export { Ticket, build };
