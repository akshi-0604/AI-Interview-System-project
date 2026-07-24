import axios from "axios";

export const generateQuestions = async (resumeText) => {
    try {
        const prompt = `
You are an AI Interviewer.

Based on the following resume, generate exactly 20 interview questions.

Resume:
${resumeText}

Return only the numbered questions.
`;

        const response = await axios.post("http://localhost:11434/api/generate", {
            model: "llama3.2:3b",
            prompt,
            stream: false,
        });

        return response.data.response;
    } catch (error) {
        console.error("Ollama Error:", error.message);
        return "Failed to generate questions.";
    }
};