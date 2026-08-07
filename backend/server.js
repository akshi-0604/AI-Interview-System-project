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
import helmet from "helmet";


dotenv.config();
console.log("EMAIL_USER:", process.env.EMAIL_USER);

// Connect to MongoDB
connectDB();

const app = express();

// Middleware
const allowedOrigins = [
  "http://localhost:5173",
  "https://ai-interview-system-project-5zt9-black.vercel.app",
  "https://ai-interview-system-project-pkl1d3ark-akshitha-1747s-projects.vercel.app",
];

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
  })
);
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

app.use(
  helmet.contentSecurityPolicy({
    directives: {
      defaultSrc: ["'self'"],

      scriptSrc: [
        "'self'",
        "https://accounts.google.com",
      ],

      styleSrc: [
        "'self'",
        "'unsafe-inline'",
      ],

      imgSrc: [
        "'self'",
        "data:",
        "https:",
      ],

      connectSrc: [
        "'self'",
        process.env.FRONTEND_URL,
        "https://accounts.google.com",
      ],

      frameSrc: [
        "https://accounts.google.com",
      ],
    },
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/interview", interviewRoutes);
app.use("/api/evaluate", evaluationRoutes);
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
