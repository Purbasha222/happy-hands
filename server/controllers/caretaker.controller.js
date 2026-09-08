import Caretaker from "../models/caretaker.model.js";

export const createCaretakerProfile = async (req, res) => {
  try {
    const {
      skills,
      careTypes,
      availableShifts,
      dailyRate,
      urgentRate,
      bio,
      experience,
      phoneNumber,
    } = req.body;

    const existing = await Caretaker.findOne({ userId: req.user._id });

    if (existing)
      return res.status(409).json({ message: "Caretaker already exists!" });

    const caretaker = await Caretaker.create({
      userId: req.user._id,
      skills,
      careTypes,
      availableShifts,
      dailyRate,
      urgentRate,
      bio,
      experience,
      phoneNumber,
    });
    return res.status(201).json({ message: "Profile created!", caretaker });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCaretakers = async (req, res) => {
  try {
    const { city, careType, shift, isAvailable } = req.query;
    const filter = {};
    if (city) filter.city = city;
    if (careType) filter.careTypes = { $in: [careType] };
    if (shift) filter.availableShifts = { $in: [shift] };
    if (isAvailable) filter.isAvailable = isAvailable === "true";

    const caretakers = await Caretaker.find(filter).populate(
      "userId",
      "name avatar phone city",
    );
    return res
      .status(200)
      .json({ message: "Fetched Successfully!", caretakers });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCaretakersById = async (req, res) => {
  try {
    const caretakerId = req.params.id;
    const caretaker = await Caretaker.findById(caretakerId).populate(
      "userId",
      "name avatar phone city",
    );
    if (!caretaker)
      return res.status(404).json({ message: "Caretaker not found" });
    return res
      .status(200)
      .json({ message: "Fetched Successfully!", caretaker });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getCaretakerProfile = async (req, res) => {
  try {
    const caretaker = await Caretaker.findOne({ userId: req.user._id });
    if (!caretaker)
      return res.status(404).json({ message: "Caretaker not found" });
    return res
      .status(200)
      .json({ message: "Fetched Successfully!", caretaker });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const updateCaretakerProfile = async (req, res) => {
  try {
    const {
      skills,
      careTypes,
      bio,
      experience,
      dailyRate,
      urgentRate,
      isAvailable,
    } = req.body;
    const caretaker = await Caretaker.findOne({ userId: req.user._id });
    if (!caretaker)
      return res.status(404).json({ message: "Caretaker not found" });
    caretaker.bio = bio ?? caretaker.bio;
    caretaker.skills = skills ?? caretaker.skills;
    caretaker.careTypes = careTypes ?? caretaker.careTypes;
    caretaker.experience = experience ?? caretaker.experience;
    caretaker.dailyRate = dailyRate ?? caretaker.dailyRate;
    caretaker.urgentRate = urgentRate ?? caretaker.urgentRate;
    caretaker.isAvailable = isAvailable ?? caretaker.isAvailable;

    const updatedCaretaker = await caretaker.save();
    return res
      .status(200)
      .json({ message: "Profile updated successfully!", updatedCaretaker });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const toggleAvailability = async (req, res) => {
  try {
    const caretaker = await Caretaker.findOne({ userId: req.user._id });
    if (!caretaker)
      return res.status(404).json({ message: "Caretaker not found!" });
    caretaker.isAvailable = !caretaker.isAvailable;
    const available = await caretaker.save();
    return res
      .status(200)
      .json({ message: "Toggled successfully!", available });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
