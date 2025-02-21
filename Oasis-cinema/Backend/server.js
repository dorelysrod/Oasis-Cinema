import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import bookingRoutes from "./routes/bookingRoutes.js";
import paymentRoutes from "./routes/paymentRoutes.js";


dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use("/api/bookings", bookingRoutes);
app.use("/api/payments", paymentRoutes);

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log("DB Connection Error:", err));

app.listen(5000, () => console.log("Server running on port 5000"));
