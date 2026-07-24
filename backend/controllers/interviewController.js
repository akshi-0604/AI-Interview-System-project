import InterviewResult from "../models/InterviewResult.js";

export const saveInterview = async (req, res) => {
  try {
    const interview = await InterviewResult.create(req.body);

    res.status(201).json({
      success: true,
      interview,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const getInterviewResults = async (req, res) => {
  try {
    const interviews = await InterviewResult.find()
      .populate("user", "fullName email")
      .sort({ createdAt: -1 });

    res.json(interviews);
  } catch (error) {
    res.status(500).json({
      message: "Server Error",
    });
  }
};

export const getInterviewById = async (req, res) => {
  try {
    const interview = await InterviewResult.findById(req.params.id)
      .populate("user", "fullName email");

    if (!interview) {
      return res.status(404).json({
        success: false,
        message: "Interview not found",
      });
    }

    res.json(interview);

  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};