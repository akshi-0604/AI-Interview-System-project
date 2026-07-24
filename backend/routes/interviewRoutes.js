import express from "express";
import {
  saveInterview,
  getInterviewResults,
  getInterviewById,
} from "../controllers/interviewController.js";

const router = express.Router();

router.post("/save", saveInterview);

router.get("/results", getInterviewResults);

router.get("/:id", getInterviewById);

export default router;