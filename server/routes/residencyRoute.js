import express from "express";
import {
  createResidency,
  getAllResidencies,
  getResidencyById,
} from "../controllers/residencyController.js";
import jwtCheck from "../config/auth0Config.js";

const router = express.Router();

router.get("/", getAllResidencies);
router.get("/:id", getResidencyById);
router.post("/create", jwtCheck, createResidency);

export { router as residencyRoute };
