import Booking from "../models/booking.model.js";
import Review from "../models/review.model.js";

export const createReview = async (req, res) => {
  try {
    const { bookingId, caretakerId, rating, comment } = req.body;

    const booking = await Booking.findById(bookingId);

    if (!booking)
      return res.status(404).json({ message: "Booking not found!" });

    if (booking.userId.toString() !== req.user._id.toString())
      return res.status(403).json({ message: "Users does not match!" });

    const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);

    const canReview =
      booking.status === "completed" ||
      (booking.status === "confirmed" && booking.startDate <= sevenDaysAgo);

    if (!canReview)
      return res.status(400).json({ message: "Cannot review yet!" });

    const alreadyReviewed = await Review.findOne({ bookingId });
    if (alreadyReviewed)
      return res.status(400).json({ message: "Already reviewed" });
    const review = await Review.create({
      userId: req.user._id,
      bookingId,
      caretakerId,
      rating,
      comment,
    });
    return res
      .status(201)
      .json({ message: "Review created successfully!", review });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getCaretakerReviews = async (req, res) => {
  try {
    const caretakerId = req.params.id;
    const review = await Review.find({ caretakerId })
      .populate("userId", "name avatar")
      .sort({ createdAt: -1 });
    return res.status(200).json({ message: "Fetched reviews", review });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};
