import mongoose from "mongoose";

const interviewSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },

    transcript: [
      {
        question: String,
        answer: String,
        feedback: String,
        score: Number,
      },
    ],

    totalScore: Number,

    noFaceViolations: Number,

    multipleFaceViolations: Number,

    tabSwitchViolations: Number,

    fullscreenViolations: Number,
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("Interview", interviewSchema);