import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import evaluationRoutes from "./routes/evaluationRoutes.js";
import followupRoutes from "./routes/followupRoutes.js";


dotenv.config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://ai-interview-system-project-5zt9-black.vercel.app",
    ],
    credentials: true,
  })
);
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/evaluate",evaluationRoutes);
app.use("/api/followup", followupRoutes);


// Test Route
app.get("/", (req, res) => {
  res.send(" AI Interview Backend Server is Running...");
});

// Port
const PORT = process.env.PORT || 5000;

// Start Server
app.listen(PORT, () => {
  console.log(` Server is running on port ${PORT}`);
});
// https://ai-interview-system-project.vercel.app