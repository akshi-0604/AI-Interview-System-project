import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";

import connectDB from "./config/db.js";

import authRoutes from "./routes/authRoutes.js";
import resumeRoutes from "./routes/resumeRoutes.js";
import questionRoutes from "./routes/questionRoutes.js";
import interviewRoutes from "./routes/interviewRoutes.js";
import evaluationRoutes from "./routes/evaluationRoutes.js";
import followupRoutes from "./routes/followupRoutes.js";

dotenv.config();

// Connect MongoDB
connectDB();

const app = express();


// CORS


const allowedOrigins = [
  "http://localhost:5173",

  // Production domain
  "https://ai-interview-system-project.vercel.app",

  // Previous deployment
  "https://ai-interview-system-project-5zt9-black.vercel.app",

  // Preview deployment
  "https://ai-interview-system-project-pkl1d3ark-akshitha-1747s-projects.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {

      // Allow Postman, mobile apps, server-to-server
      if (!origin) {
        return callback(null, true);
      }

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      console.log("Blocked Origin:", origin);

      return callback(new Error("Not allowed by CORS"));
    },

    credentials: true,
  })
);


// Middleware


app.use(express.json());

app.use(helmet());

app.use(
  helmet.crossOriginOpenerPolicy({
    policy: "same-origin-allow-popups",
  })
);

app.use(
  helmet.frameguard({
    action: "sameorigin",
  })
);


app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/evaluate", evaluationRoutes);
app.use("/api/followup", followupRoutes);



app.get("/", (req, res) => {
  res.send("AI Interview Backend Server is Running...");
});


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});