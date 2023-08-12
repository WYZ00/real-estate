import express from "express";
import {
  bookVisit,
  bookVisitAll,
  cancelBooking,
  createUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/allBookings", bookVisitAll);
router.post("/bookvisits/:id", bookVisit);
router.post("/removeBooking/:id", cancelBooking);

export { router as userRouter };
