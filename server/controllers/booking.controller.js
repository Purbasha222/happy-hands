import Caretaker from "../models/caretaker.model.js";
import Booking from "../models/booking.model.js";

const shiftDefaults = {
  "full-day": { startTime: "09:00", endTime: "17:00" },
  "full-night": { startTime: "19:00", endTime: "07:00" },
  afternoon: { startTime: "12:00", endTime: "17:00" },
  evening: { startTime: "17:00", endTime: "21:00" },
};

const getRange = (startDate, startTime, endDate, endTime) => {
  const start = new Date(startDate);
  const [sh, sm] = startTime.split(":").map(Number);
  start.setHours(sh, sm, 0, 0);

  const end = new Date(endDate);
  const [eh, em] = endTime.split(":").map(Number);
  end.setHours(eh, em, 0, 0);

  if (end <= start) end.setDate(end.getDate() + 1); // full-night
  return { start, end };
};

const getBookingEndDateTime = (b) =>
  getRange(b.startDate, b.startTime, b.endDate, b.endTime).end;

const autoCompleteExpiredBookings = async (filter = {}) => {
  const now = new Date();
  const confirmedBookings = await Booking.find({
    ...filter,
    status: "confirmed",
  });

  const expiredBookings = confirmedBookings.filter(
    (b) => getBookingEndDateTime(b) <= now,
  );

  if (expiredBookings.length > 0) {
    await Booking.updateMany(
      { _id: { $in: expiredBookings.map((b) => b._id) } },
      { status: "completed" },
    );
  }
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

    const today = new Date();
    today.setHours(0, 0, 0, 0);
    if (new Date(startDate) < today || new Date(endDate) < new Date(startDate))
      return res.status(400).json({ message: "Invalid dates." });

    const caretaker = await Caretaker.findById(caretakerId);
    if (!caretaker)
      return res.status(404).json({ message: "Caretaker not found!" });

    if (!caretaker.careTypes.includes(careType))
      return res
        .status(400)
        .json({ message: "This caretaker does not offer that care type." });

    if (!caretaker.availableShifts.includes(shift))
      return res
        .status(400)
        .json({ message: "This caretaker is not available for that shift." });

    const conflictingBooking = await Booking.findOne({
      userId: req.user._id,
      shift,
      careType,
      status: "confirmed",
      startDate: { $lte: endDate },
      endDate: { $gte: startDate },
    });

    if (conflictingBooking)
      return res.status(400).json({
        message:
          "You already have a confirmed booking for this care type, shift and date range.",
      });

    const finalStartTime = startTime || shiftDefaults[shift].startTime;
    const finalEndTime = endTime || shiftDefaults[shift].endTime;

    const { start: newStart, end: newEnd } = getRange(
      startDate,
      finalStartTime,
      endDate,
      finalEndTime,
    );

    const { start: shiftStart, end: shiftEnd } = getRange(
      startDate,
      shiftDefaults[shift].startTime,
      endDate,
      shiftDefaults[shift].endTime,
    );

    if (newStart < shiftStart || newEnd > shiftEnd) {
      return res.status(400).json({
        message: "Selected time is outside the shift's allowed range.",
      });
    }

    const caretakerBookings = await Booking.find({
      caretakerId,
      status: "confirmed",
      startDate: { $lte: endDate },
      endDate: { $gte: startDate },
    });

    const hasOverlap = caretakerBookings.some((b) => {
      const { start, end } = getRange(
        b.startDate,
        b.startTime,
        b.endDate,
        b.endTime,
      );
      return newStart < end && newEnd > start;
    });

    if (hasOverlap)
      return res.status(400).json({
        message: "This caretaker is already booked for this time range.",
      });

    const dailyRate = caretaker.dailyRate;
    const urgentRate = caretaker.urgentRate;

    const days =
      (new Date(endDate) - new Date(startDate)) / (1000 * 60 * 60 * 24);

    const totalDays = shift === "full-night" ? Math.max(days, 1) : days + 1;

    const totalAmount =
      totalDays * (bookingType === "scheduled" ? dailyRate : urgentRate);

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
    await autoCompleteExpiredBookings({ userId });
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
    const caretaker = await Caretaker.findOne({ userId: req.user._id });

    if (!caretaker)
      return res.status(404).json({ message: "Caretaker not found!" });

    await autoCompleteExpiredBookings({ caretakerId: caretaker._id });
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
    const booking = await Booking.findById(req.params.id);

    if (!booking)
      return res.status(404).json({ message: "Booking not found!" });

    const caretaker = await Caretaker.findOne({ userId: req.user._id });
    if (!caretaker || !booking.caretakerId.equals(caretaker._id))
      return res.status(403).json({ message: "Not allowed" });

    if (booking.status !== "pending")
      return res
        .status(400)
        .json({ message: "Only pending bookings can be updated." });

    // only the values your Accept / Decline buttons send
    if (!["confirmed", "cancelled"].includes(status))
      return res.status(400).json({ message: "Invalid status." });

    // 1. save the booking FIRST
    booking.status = status;
    const updatedBookingStatus = await booking.save();

    // 2. then cancel the others
    if (status === "confirmed") {
      const { start: confirmedStart, end: confirmedEnd } = getRange(
        booking.startDate,
        booking.startTime,
        booking.endDate,
        booking.endTime,
      );

      const pendingBookings = await Booking.find({
        caretakerId: booking.caretakerId,
        status: "pending",
        _id: { $ne: booking._id },
        startDate: { $lte: booking.endDate },
        endDate: { $gte: booking.startDate },
      });

      const overlappingIds = pendingBookings
        .filter((b) => {
          const { start, end } = getRange(
            b.startDate,
            b.startTime,
            b.endDate,
            b.endTime,
          );
          return confirmedStart < end && confirmedEnd > start;
        })
        .map((b) => b._id);

      if (overlappingIds.length > 0) {
        await Booking.updateMany(
          { _id: { $in: overlappingIds } },
          { status: "auto-cancelled" },
        );
      }

      await Booking.updateMany(
        {
          userId: booking.userId,
          shift: booking.shift,
          careType: booking.careType,
          status: "pending",
          _id: { $ne: booking._id },
          startDate: { $lte: booking.endDate },
          endDate: { $gte: booking.startDate },
        },
        { status: "auto-cancelled" },
      );

      // 3. auto message goes here (your task)
    }

    return res.json({
      message: "Booking status updated!",
      updatedBookingStatus,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
