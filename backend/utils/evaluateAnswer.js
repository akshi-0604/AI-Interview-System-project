import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

export const evaluateAnswer = async (question, answer) => {
  const prompt = `
You are an expert technical interviewer.

Evaluate the candidate's answer.

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
  "confidence": "Low"
}

Rules:
- Score must be between 0 and 5.
- Do not return markdown.
- Do not use \`\`\`json.
- Return only the JSON object.
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.3,
    messages: [
      {
        role: "user",
        content: prompt,
      },
    ],
  });

  let response = completion.choices[0].message.content.trim();

  // Remove markdown if present
  response = response.replace(/```json/g, "").replace(/```/g, "").trim();

  try {
    return JSON.parse(response);
  } catch (error) {
    console.log("Groq JSON Parse Error:", error);

    return {
      score: 0,
      feedback: response,
      strengths: "",
      weaknesses: "",
      improvement: "",
      confidence: "Unknown",
    };
  }
};