import axios from "axios";

export const evaluateAnswer = async (question, answer) => {
  try {
    const prompt = `
You are an AI technical interviewer.

Evaluate the candidate answer.

Question:
${question}

Candidate Answer:
${answer}

Return ONLY valid JSON.

{
  "score": 0,
  "feedback": "",
  "strengths": "",
  "weaknesses": "",
  "improvement": "",
  "confidence": 0
}

Score must be between 0 and 5.
Confidence must be between 0 and 100.
`;

    const response = await axios.post(
      "http://localhost:11434/api/generate",
      {
        model: "llama3.2:3b",
        prompt,
        stream: false,
      }
    );

    let text = response.data.response;

    const start = text.indexOf("{");
    const end = text.lastIndexOf("}");

    if (start !== -1 && end !== -1) {
      text = text.substring(start, end + 1);
    }

    return JSON.parse(text);

  } catch (error) {

    console.log(error);

    return {
      score: 0,
      feedback: "Unable to evaluate answer.",
      strengths: "",
      weaknesses: "",
      improvement: "",
      confidence: 0,
    };
  }
};