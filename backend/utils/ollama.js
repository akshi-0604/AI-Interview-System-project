import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const generateQuestions = async (resumeText) => {
    try {
        const completion = await groq.chat.completions.create({
            model: "llama-3.3-70b-versatile",
            temperature: 0.5,
            messages: [
                {
                    role: "system",
                    content: `
You are an AI Technical Interviewer.

Generate exactly 20 interview questions based ONLY on the candidate's resume.

Rules:
1. Mix HR + Technical questions.
2. Questions should become progressively harder.
3. Return ONLY numbered questions.
`,
                },
                {
                    role: "user",
                    content: resumeText,
                },
            ],
        });

        return completion.choices[0].message.content;
    } catch (error) {
        console.error("Groq Error:", error);

        return "Failed to generate interview questions.";
    }
};