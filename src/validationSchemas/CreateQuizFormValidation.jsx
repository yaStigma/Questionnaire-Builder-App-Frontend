import * as yup from "yup";
const optionSchema = yup.object().shape({
  text: yup
    .string()
    .min(1, "Answer option text cannot be empty")
    .required("Answer option is required"),
});

const questionSchema = yup.object().shape({
  text: yup
    .string()
    .min(5, "The question must be at least 5 characters long")
    .max(500, "The question cannot exceed 500 characters")
    .required("Question text is required"),
  type: yup
    .string()
    .oneOf(
      ["text", "single", "multiple"],
      'The question type must be "text", "single", or "multiple"'
    )
    .required("Question type is required"),
  options: yup
    .array()
    .of(optionSchema)
    .when("type", {
      is: (type) => type === "single" || type === "multiple",
      then: (schema) =>
        schema
          .min(
            2,
            "At least 2 answer options are required for single or multiple choice questions"
          )
          .required("Options are required for this type of question"),
      otherwise: (schema) => schema.notRequired(),
    }),
});

export const validateSchema = yup.object().shape({
  quizName: yup
    .string()
    .min(3, "Quiz name must be at least 3 characters long")
    .max(100, "Quiz name cannot exceed 100 characters")
    .required("Quiz name is required"),
  quizDescription: yup
    .string()
    .min(10, "Description must be at least 10 characters long")
    .max(500, "Description cannot exceed 500 characters")
    .required("Quiz description is required"),
  questions: yup
    .array()
    .of(questionSchema)
    .min(1, "The questionnaire must contain at least one question")
    .required("Questions field is required"),
});
