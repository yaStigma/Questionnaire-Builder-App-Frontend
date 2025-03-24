import axios from "axios";

const baseURL = "https://questionnaire-builder-app-backend-84lo.onrender.com/";

export const fetchAllQuestionnaires = async () => {
  try {
    const response = await axios.get(`${baseURL}questionnaire`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching questionnaires:", error.message);
    return null;
  }
};
export const fetchQuestionnaireById = async (id) => {
  try {
    const response = await axios.get(`${baseURL}questionnaire/${id}`);
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching questionnaire id:", error.message);
    return null;
  }
};
export const createQuestionnaire = async ({
  quizName,
  quizDescription,
  questions,
}) => {
  try {
    const response = await axios.post(`${baseURL}questionnaire`, {
      quizName,
      quizDescription,
      questions,
    });
    console.log(response.data.data);
    return response.data.data;
  } catch (error) {
    console.error(
      "Error posting questionnaire:",
      error.response?.data || error.message
    );
    return null;
  }
};
export const deleteQuestionnaire = async (id) => {
  try {
    const response = await axios.delete(`${baseURL}questionnaire/${id}`);
    if (response.status === 204) {
      console.log(`Questionnaire with ID ${id} deleted successfully.`);
      return { success: true, message: "Deleted successfully" };
    }

    return response.data;
  } catch (error) {
    console.error("Error deleting questionnaire:", error.message);
    return { success: false, message: error.message };
  }
};
