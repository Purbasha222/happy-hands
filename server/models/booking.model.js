import mongoose from "mongoose";

const bookingSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    caretakerId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "caretaker",
      required: true,
    },
    careType: { type: String, enum: ["child", "adult", "pet"] },
    bookingType: { type: String, enum: ["scheduled", "urgent"] },
    shift: {
      type: String,
      enum: ["full-day", "full-night", "afternoon", "evening"],
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    status: {
      type: String,
      enum: ["pending", "confirmed", "completed", "cancelled"],
      default: "pending",
    },
    totalAmount: { type: Number },
    specialInstructions: { type: String },
  },
  { timestamps: true },
);

export default mongoose.model("booking", bookingSchema);
