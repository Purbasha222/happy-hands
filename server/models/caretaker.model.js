import mongoose from "mongoose";

const caretakerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    skills: { type: [String], required: true },
    careTypes: {
      type: [String],
      required: true,
      enum: ["elderly", "child", "pet"],
    },
    availableShifts: {
      type: [String],
      required: true,
      enum: ["full-day", "full-night", "afternoon", "evening"],
    },
    dailyRate: {
      type: Number,
      default: 300,
    },
    urgentRate: { type: Number, default: 400 },
    rating: { type: Number, default: 0 },
    totalReviews: { type: Number, default: 0 },
    isAvailable: { type: Boolean, default: true },
    isVerified: { type: Boolean, default: false },
    bio: { type: String },
    experience: { type: Number, default: 0 },
  },
  { timestamps: true },
);

export default mongoose.model("caretaker", caretakerSchema);
