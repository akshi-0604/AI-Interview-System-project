import ollama from "ollama";

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

  const systemPrompt = {
  role: "system",
  content: `
You are an experienced HR interviewer.

Candidate Resume:

${resumeContext}

Rules:

1. Always use the resume while asking questions.

2. Remember the entire conversation.

3. Never repeat a question.

4. Ask deeper follow-up questions when necessary.

5. If a topic is completed, move to another important skill from the resume.

6. Ask only ONE interview question.

7. Return ONLY the question.
`,
};

  const response = await ollama.chat({
    model: "llama3.2:3b",
    messages: [
      systemPrompt,
      ...conversationHistory,
    ],
  });

  const nextQuestion = response.message.content;

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