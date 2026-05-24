import express from "express";
import {
  getCaretakers,
  getCaretakersById,
  toggleAvailability,
  updateCaretakerProfile,
} from "../controllers/caretaker.controller.js";
import auth from "../middlewares/auth.middleware.js";
import role from "../middlewares/role.middleware.js";

const route = express.Router();

route.get("/", getCaretakers);
route.get("/:id", getCaretakersById);
route.put("/profile", auth, role("caretaker"), updateCaretakerProfile);
route.patch("/availability", auth, role("caretaker"), toggleAvailability);

export default route;
