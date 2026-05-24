import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth_routes.js";
import caretakerRoutes from "./routes/caretaker_routes.js";
import bookingRoutes from "./routes/booking_routes.js";
import reviewRoutes from "./routes/review_routes.js";

dotenv.config();
const app = express();
const port = process.env.PORT;
app.use(cors({ origin: "*" }));
app.use(express.json());
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/caretakers", caretakerRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/reviews", reviewRoutes);

app.listen(port, () => console.log(`Server running on port ${port}`));
