import express from "express";
import {
  bookVisit,
  bookVisitAll,
  createUser,
} from "../controllers/userController.js";

const router = express.Router();

router.post("/register", createUser);
router.post("/allBookings", bookVisitAll);
router.post("/bookvisits/:id", bookVisit);

export { router as userRouter };
