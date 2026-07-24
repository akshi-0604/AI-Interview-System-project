import express from "express";
import { followupQuestion } from "../controllers/followupController.js";

const router = express.Router();

router.post("/", followupQuestion);

export default router;