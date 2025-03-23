import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { createQuestionnaire } from "../../api/QuestionnaireRequests";
import CSS from "./CreateQuizForm.module.css";
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

const validateSchema = yup.object().shape({
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

export default function CreateQuizForm() {
  const {
    control,
    handleSubmit,
    register,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validateSchema),
    defaultValues: {
      quizName: "",
      quizDescription: "",
      questions: [{ text: "", type: "text", options: [] }],
    },
  });

  const {
    fields: questions,
    append,
    remove,
  } = useFieldArray({ control, name: "questions" });

  const onSubmit = async (data) => {
    const result = await createQuestionnaire(data);
    if (result) {
      console.log("Questionnaire successfully created:", result);
      reset();
    } else {
      console.error("Failed to create questionnaire");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={CSS.formWrapper}>
      <div className={CSS.boxWrapper}>
        <div className={CSS.box}>
          <div className={CSS.boxLabel}>
            <label className={CSS.textTitle}>Quiz Name:</label>
            <input
              className={`${CSS.inputName} ${CSS.input}`}
              {...register("quizName")}
            />
          </div>
          <p className={CSS.textError}>{errors.quizName?.message}</p>
        </div>

        <div className={CSS.box}>
          <div className={CSS.boxLabel}>
            <label className={CSS.textTitle}>Quiz Description:</label>
            <textarea
              className={`${CSS.inputText} ${CSS.input}`}
              {...register("quizDescription")}
            />
          </div>
          <p className={CSS.textError}>{errors.quizDescription?.message}</p>
        </div>
        <div className={CSS.boxQuestions}>
          <p className={CSS.textTitle}>Questions:</p>
          {questions.map((question, qIndex) => {
            const type = watch(`questions.${qIndex}.type`);

            return (
              <div key={question.id} className={CSS.blocQuestions}>
                <div className={CSS.blocStatic}>
                  <p className={CSS.textTitle}>{qIndex + 1}.</p>
                  <input
                    className={`${CSS.inputText} ${CSS.input}`}
                    {...register(`questions.${qIndex}.text`)}
                    placeholder="Question text"
                  />

                  <select
                    className={CSS.select}
                    {...register(`questions.${qIndex}.type`)}
                  >
                    <option value="text">Text</option>
                    <option value="single">Single Choice</option>
                    <option value="multiple">Multiple Choice</option>
                  </select>

                  <button
                    type="button"
                    onClick={() => remove(qIndex)}
                    className={CSS.button}
                  >
                    <img
                      src="/delete.svg"
                      alt="delete icon"
                      className={CSS.icon}
                    />
                  </button>
                </div>
                <p className={CSS.textError}>
                  {errors.questions?.[qIndex]?.text?.message}
                </p>
                {type === "single" || type === "multiple" ? (
                  <div>
                    <p className={CSS.inputText}>Options:</p>
                    <Controller
                      control={control}
                      name={`questions.${qIndex}.options`}
                      render={({ field }) => (
                        <>
                          {field.value.map((_, optIndex) => (
                            <div key={optIndex} className={CSS.boxOption}>
                              <input
                                {...register(
                                  `questions.${qIndex}.options.${optIndex}.text`
                                )}
                                placeholder="Option text"
                                className={`${CSS.inputTextOption} ${CSS.input}`}
                              />
                              <button
                                type="button"
                                className={CSS.button}
                                onClick={() => {
                                  const newOptions = [...field.value];
                                  newOptions.splice(optIndex, 1);
                                  setValue(
                                    `questions.${qIndex}.options`,
                                    newOptions
                                  );
                                }}
                              >
                                <img
                                  src="/delete.svg"
                                  alt="delete icon"
                                  className={CSS.icon}
                                />
                              </button>
                            </div>
                          ))}
                          <button
                            type="button"
                            className={CSS.button}
                            onClick={() =>
                              setValue(`questions.${qIndex}.options`, [
                                ...field.value,
                                { text: "" },
                              ])
                            }
                          >
                            Add Option
                          </button>
                        </>
                      )}
                    />
                  </div>
                ) : null}
              </div>
            );
          })}

          <button
            type="button"
            className={CSS.button}
            onClick={() => append({ text: "", type: "text", options: [] })}
          >
            Add Question
          </button>
        </div>
      </div>
      <button className={`${CSS.textTitle} ${CSS.button} `} type="submit">
        Submit
      </button>
    </form>
  );
}
