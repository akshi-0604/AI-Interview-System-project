import API from "./api";

export const evaluateAnswer = async (question, answer) => {
  const response = await API.post("/evaluate", {
    question,
    answer,
  });

  return response.data;
};