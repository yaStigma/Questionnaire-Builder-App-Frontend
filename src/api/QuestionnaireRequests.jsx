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
// export const createQuestionnaire = async (id) => {
//   try {
//     const response = await axios.post(`${baseURL}questionnaire}`);
//     console.log(response.data.data);
//     return response.data.data;
//   } catch (error) {
//     console.error("Error fetching questionnaire id:", error.message);
//     return null;
//   }
// };
