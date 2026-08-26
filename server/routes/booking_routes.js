import express from "express";
import {
  createBooking,
  getCaretakerBookings,
  getMyBookings,
  updateBookingStatus,
} from "../controllers/booking.controller.js";
import auth from "../middlewares/auth.middleware.js";
import role from "../middlewares/role.middleware.js";

const route = express.Router();

route.post("/", auth, role("customer"), createBooking);
route.get("/my", auth, role("customer"), getMyBookings);
route.get("/caretaker", auth, role("caretaker"), getCaretakerBookings);
route.patch(
  "/:id/status",
  auth,
  role("customer", "caretaker"),
  updateBookingStatus,
);

export default route;
