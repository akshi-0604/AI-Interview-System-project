import mongoose from "mongoose";

const interviewResultSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    // Transcript of the complete interview
    transcript: [
      {
        question: {
          type: String,
        },

        answer: {
          type: String,
        },

        feedback: {
          type: String,
        },

        score: {
          type: Number,
        },

        strengths: {
          type: String,
        },

        weaknesses: {
          type: String,
        },

        improvement: {
          type: String,
        },

        confidence: {
          type: String,
        },
      },
    ],

    // Overall Interview Score
    score: {
      type: Number,
      required: true,
    },

    totalQuestions: {
      type: Number,
      required: true,
    },

    // Proctoring Violations
    noFaceViolations: {
      type: Number,
      default: 0,
    },

    multipleFaceViolations: {
      type: Number,
      default: 0,
    },

    tabSwitchViolations: {
      type: Number,
      default: 0,
    },

    fullscreenViolations: {
      type: Number,
      default: 0,
    },

    // Final AI Recommendation
    overallFeedback: {
      type: String,
      default: "",
    },

    recommendation: {
      type: String,
      default: "",
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model("InterviewResult", interviewResultSchema);