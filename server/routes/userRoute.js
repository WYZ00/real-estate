import express from "express";
import {
  allFav,
  bookVisit,
  bookVisitAll,
  cancelBooking,
  createUser,
  toFav,
} from "../controllers/userController.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.post("/register", jwtCheck, createUser);
router.post("/allBookings", bookVisitAll);
router.post("/bookvisits/:id", jwtCheck, bookVisit);
router.post("/removeBooking/:id", jwtCheck, cancelBooking);
router.post("/toFav/:rid", jwtCheck, toFav);
router.post("/allFav", jwtCheck, allFav);

export { router as userRouter };
