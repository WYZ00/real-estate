import express from "express";
import {
  createResidency,
  getAllResidencies,
} from "../controllers/residencyController.js";

const router = express.Router();

router.get("/", getAllResidencies);
router.post("/create", createResidency);


export { router as residencyRoute };
