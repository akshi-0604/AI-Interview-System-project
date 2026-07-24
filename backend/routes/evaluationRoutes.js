import express from "express";
import { evaluateInterviewAnswer } from "../controllers/evaluationController.js";
import {
  saveInterview,
  getInterviewResults,
  getInterviewById,
} from "../controllers/interviewController.js";

const router = express.Router();

router.post("/", evaluateInterviewAnswer);

export default router;