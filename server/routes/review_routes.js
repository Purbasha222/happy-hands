import express from "express";
import auth from "../middlewares/auth.middleware.js";
import {
  createReview,
  getCaretakerReviews,
} from "../controllers/review.controller.js";

const route = express.Router();

route.post("/", auth, createReview);
route.get("/caretaker/:id", getCaretakerReviews);

export default route;
