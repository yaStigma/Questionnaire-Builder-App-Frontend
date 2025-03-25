import * as yup from "yup";

export const answerValidationSchema = yup.object().shape({
  questionnaireId: yup.string().required("Questionnaire ID is required"),
  answers: yup
    .object()
    .test("is-valid-answers", "Invalid answers format", (value) => {
      if (!value || typeof value !== "object") return false;

      return Object.values(value).every((answer) => {
        return (
          typeof answer === "string" ||
          (Array.isArray(answer) &&
            answer.every((item) => typeof item === "string"))
        );
      });
    })
    .required("Answers are required"),
  timeSpent: yup
    .number()
    .min(1, "Time spent must be at least 1 second")
    .required("Time spent is required"),
});
