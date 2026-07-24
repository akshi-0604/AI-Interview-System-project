import Groq from "groq-sdk";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY,
});

let conversationHistory = [];
let resumeContext = "";

export const generateNextQuestion = async (
  previousQuestion,
  candidateAnswer
) => {
  conversationHistory.push({
    role: "assistant",
    content: previousQuestion,
  });

  conversationHistory.push({
    role: "user",
    content: candidateAnswer,
  });

  const systemPrompt = `
You are an experienced HR and Technical Interviewer.

Candidate Resume:

${resumeContext}

Rules:

1. Ask interview questions based on the resume.
2. Remember the previous conversation.
3. Never repeat a question.
4. Ask only ONE question.
5. If the answer is weak, ask a follow-up.
6. Otherwise move to another resume topic.
7. Return ONLY the next interview question.
`;

  const completion = await groq.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    temperature: 0.6,
    messages: [
      {
        role: "system",
        content: systemPrompt,
      },
      ...conversationHistory,
    ],
  });

  const nextQuestion = completion.choices[0].message.content.trim();

  conversationHistory.push({
    role: "assistant",
    content: nextQuestion,
  });

  return nextQuestion;
};

export const clearConversation = () => {
  conversationHistory = [];
};

export const setResumeContext = (resumeText) => {
  resumeContext = resumeText;
};