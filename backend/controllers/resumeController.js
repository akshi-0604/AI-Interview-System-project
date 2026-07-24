import Resume from "../models/Resume.js";
import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";
import { extractResumeText } from "../utils/extractResume.js";
import { generateQuestions } from "../utils/ollama.js";
import Question from "../models/Question.js";
import { clearConversation,setResumeContext } from "../utils/generateNextQuestion.js";


export const uploadResume = async (req, res) => {
  clearConversation();
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Please upload a resume.",
      });
    }

    const resumeText = await extractResumeText(req.file.buffer);
    setResumeContext(resumeText);
    const questions = await generateQuestions(resumeText);
    const questionArray = questions
      .split("\n")
      .filter(q => q.trim() !== "");

      // Delete old questions (optional)
await Question.deleteMany({});

// Save new questions
const questionDocuments = questionArray.map((q) => ({
  question: q,
}));

await Question.insertMany(questionDocuments);

console.log("Questions saved in MongoDB");

    console.log("Generated Interview Questions:");
    console.log(questions);

    console.log(resumeText);

    const streamUpload = () =>
      new Promise((resolve, reject) => {
        console.log("Cloudinary config:", cloudinary.config());
        const stream = cloudinary.uploader.upload_stream(
          {
            folder: "ai-interview-resumes",
            resource_type: "raw",
          },
          (error, result) => {
            if (result) resolve(result);
            else reject(error);
          }
        );

        streamifier.createReadStream(req.file.buffer).pipe(stream);
      });

    const result = await streamUpload();

    const resume = await Resume.create({
      user: req.body.user,
      fileName: req.file.originalname,
      resumeUrl: result.secure_url,
      publicId: result.public_id,
      fileSize: req.file.size,
      questions: questionArray,
    });

    return res.status(201).json({
      success: true,
      message: "Resume uploaded successfully.",
      resume,
    });

  } catch (error) {
    console.error(error);

    return res.status(500).json({
      success: false,
      message: "Internal Server Error.",
    });
  }
};