import Caretaker from "../models/caretaker.model.js";
import Booking from "../models/booking.model.js";

const shiftDefaults = {
  "full-day": { startTime: "09:00 AM", endTime: "05:00 PM" },
  "full-night": { startTime: "07:00 PM", endTime: "07:00 AM" },
  afternoon: { startTime: "12:00 PM", endTime: "05:00 PM" },
  evening: { startTime: "05:00 PM", endTime: "09:00 PM" },
};

export const createBooking = async (req, res) => {
  try {
    const {
      careType,
      bookingType,
      shift,
      startDate,
      endDate,
      startTime,
      endTime,
      address,
      city,
      specialInstructions,
      caretakerId,
    } = req.body;

    const conflictingBooking = await Booking.findOne({
      userId: req.user._id,
      shift,
      status: "confirmed",
      startDate: { $lte: endDate },
      endDate: { $gte: startDate },
    });
    if (conflictingBooking)
      return res.status(400).json({
        message:
          "You already have a confirmed booking for this shift and date range.",
      });

    const caretaker = await Caretaker.findById(caretakerId);
    if (!caretaker)
      return res.status(404).json({ message: "Caretaker not found!" });

    const dailyRate = caretaker.dailyRate;
    const urgentRate = caretaker.urgentRate;
    const days =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);
    const totalDays = days + 1;
    const totalAmount =
      totalDays * (bookingType === "scheduled" ? dailyRate : urgentRate);

    const finalStartTime = startTime || shiftDefaults[shift].startTime;
    const finalEndTime = endTime || shiftDefaults[shift].endTime;

    const booking = await Booking.create({
      careType,
      bookingType,
      shift,
      startDate,
      endDate,
      startTime: finalStartTime,
      endTime: finalEndTime,
      address,
      city,
      specialInstructions,
      caretakerId,
      totalAmount,
      userId: req.user._id,
    });
    res.status(201).json({ message: "Booking created successfully!", booking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getMyBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const myBooking = await Booking.find({ userId })
      .populate({
        path: "caretakerId",
        populate: {
          path: "userId",
          select: "name avatar phone",
        },
      })
      .sort({ createdAt: -1 });
    res
      .status(200)
      .json({ message: "fetched my bookings successfully!", myBooking });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCaretakerBookings = async (req, res) => {
  try {
    const userId = req.user._id;
    const caretaker = await Caretaker.findOne({ userId: req.user._id });
    if (!caretaker)
      return res.status(404).json({ message: "Caretaker not found!" });
    const caretakerBooking = await Booking.find({ caretakerId: caretaker._id })
      .populate("userId", "name phone city")
      .sort({ createdAt: -1 });
    return res.status(200).json({
      message: "Caretaker Bookings fetched successfully!",
      caretakerBooking,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const bookingId = req.params.id;
    const booking = await Booking.findById(bookingId);
    if (!booking)
      return res.status(404).json({ message: "Booking not found!" });
    booking.status = status;
    if (status === "confirmed") {
      await Caretaker.findByIdAndUpdate(booking.caretakerId, {
        isAvailable: false,
      });
      await Booking.updateMany(
        {
          userId: booking.userId,
          shift: booking.shift,
          status: "pending",
          _id: { $ne: booking._id },
          startDate: { $lte: booking.endDate },
          endDate: { $gte: booking.startDate },
        },
        { status: "auto-cancelled" },
      );
    } else if (status === "completed" || status === "cancelled") {
      await Caretaker.findByIdAndUpdate(booking.caretakerId, {
        isAvailable: true,
      });
    }
    const updatedBookingStatus = await booking.save();
    return res.json({
      message: "Booking status updated!",
      updatedBookingStatus,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
