import express from "express";
import {
  createCaretakerProfile,
  getCaretakerProfile,
  getCaretakers,
  getCaretakersById,
  toggleAvailability,
  updateCaretakerProfile,
} from "../controllers/caretaker.controller.js";
import auth from "../middlewares/auth.middleware.js";
import role from "../middlewares/role.middleware.js";

const route = express.Router();

route.post("/onboarding", auth, role("caretaker"), createCaretakerProfile);
route.get("/", getCaretakers);
route.get("/profile", auth, role("caretaker"), getCaretakerProfile);
route.get("/:id", getCaretakersById);
route.put("/edit-profile", auth, role("caretaker"), updateCaretakerProfile);
route.patch("/availability", auth, role("caretaker"), toggleAvailability);

export default route;
