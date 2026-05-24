import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String },
    googleId: { type: String },
    role: {
      type: String,
      required: true,
      enum: ["user", "caretaker", "admin"],
      default: "user",
    },
    phone: { type: String },
    city: { type: String },
    avatar: { type: String },
  },
  { timestamps: true },
);

userSchema.methods.matchPassword = async function (enteredPassword) {
  const compare = await bcrypt.compare(enteredPassword, this.password);
  return compare;
};

userSchema.pre("save", async function () {
  try {
    if (this.isModified("password")) {
      const salt = await bcrypt.genSalt(10);
      this.password = await bcrypt.hash(this.password, salt);
    }
    return;
  } catch (error) {
    console.log(error);
  }
});

export default mongoose.model("user", userSchema);
