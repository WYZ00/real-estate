import express from "express";
import {
  allFav,
  bookVisit,
  bookVisitAll,
  cancelBooking,
  createUser,
  toFav,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/allBookings", bookVisitAll);
router.post("/bookvisits/:id", bookVisit);
router.post("/removeBooking/:id", cancelBooking);
router.post("/toFav/:rid", toFav);
router.post("/allFav", allFav);

export { router as userRouter };
