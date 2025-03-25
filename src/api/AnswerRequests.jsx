import axios from "axios";

const baseURL = "https://questionnaire-builder-app-backend-84lo.onrender.com/";

// const baseURL = "http://localhost:3000/";

export const createAnswer = async ({ questionnaireId, answers, timeSpent }) => {
  try {
    const response = await axios.post(`${baseURL}answer`, {
      questionnaireId,
      answers,
      timeSpent,
    });
    console.log("Response:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error posting answer:", error);
    return null;
  }
};
