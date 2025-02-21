import mongoose from "mongoose";

const BookingSchema = new mongoose.Schema({
  movieTitle: { type: String, required: true },
  showtime: { type: String, required: true },
  numTickets: { type: Number, required: true },
  price: { type: Number, required: true },
  bookingDate: { type: Date, required: true },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
  },
  paymentStatus: { type: String, default: "pending" },
});

const Booking = mongoose.model("Booking", BookingSchema);
export default Booking;
