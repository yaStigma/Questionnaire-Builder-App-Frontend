import { useForm, useFieldArray, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { validateSchema } from "../../validationSchemas/QuizFormValidation";
import { updateQuestionnaire } from "../../api/QuestionnaireRequests";
import CSS from "./EditQuizForm.module.css";
import Loader from "../Loader/Loader";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function EditeQuizForm({ quizData }) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
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

  useEffect(() => {
    if (quizData) {
      reset({
        quizName: quizData.quizName,
        quizDescription: quizData.quizDescription,
        questions: quizData.questions || [
          { text: "", type: "text", options: [] },
        ],
      });
    }
  }, [quizData, reset]);
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const result = await updateQuestionnaire(quizData._id, data);
      if (result) {
        console.log("Questionnaire successfully updated:", result);
        setLoading(false);
        navigate("/");
      } else {
        console.error("Failed to update questionnaire");
        setLoading(false);
      }
    } catch (error) {
      console.error("Error updating questionnaire:", error);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={CSS.formWrapper}>
      {loading && <Loader />}
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
