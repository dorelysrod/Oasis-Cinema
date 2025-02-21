import express from "express";
import {
  createBooking,
  getBookings,
  getBookingById,
  deleteBooking,
} from "../controllers/bookingController.js";

const router = express.Router();

router.post("/", createBooking); // Create a booking
router.get("/", getBookings); // Get all bookings
router.get("/:id", getBookingById); // Get a specific booking
router.delete("/:id", deleteBooking); // Delete a booking

export default router;
