import User from "../models/user.model.js";
import Caretaker from "../models/caretaker.model.js";
import jwt from "jsonwebtoken";

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists)
      return res.status(400).json({ message: "email already exists!" });

    const newUser = await User.create({ name, email, password, role });

    if (role === "caretaker") {
      await Caretaker.create({ userId: newUser._id });
    }

    const userResponse = await User.findById(newUser._id).select("-password");

    const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    return res.status(201).json({
      message: "User created successfully!",
      token,
      user: userResponse,
    });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "User not found" });
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(500).json({ message: "Passwords does not match!" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ message: "Error", error });
  }
};
