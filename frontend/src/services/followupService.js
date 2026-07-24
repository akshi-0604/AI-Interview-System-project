import API from "./api";

export const getFollowupQuestion = async (
  previousQuestion,
  answer
) => {
  const response = await API.post("/followup", {
    previousQuestion,
    answer,
  });

  return response.data;
};