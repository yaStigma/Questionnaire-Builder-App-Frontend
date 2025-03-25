import { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import { createAnswer } from "../../api/AnswerRequests";
import { useNavigate } from "react-router-dom";

import Loader from "../Loader/Loader";
import CSS from "./QuizForm.module.css";
export default function QuizForm({ quizData }) {
  const [loading, setLoading] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const navigate = useNavigate();
  useEffect(() => {
    setStartTime(Date.now());
    const intervalId = setInterval(() => {
      setSeconds((prevSeconds) => prevSeconds + 1);
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  const formatTime = (sec) => {
    const hours = Math.floor(sec / 3600);
    const minutes = Math.floor((sec % 3600) / 60);
    const seconds = sec % 60;

    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(
      2,
      "0"
    )}:${String(seconds).padStart(2, "0")}`;
  };

  const { control, handleSubmit, setValue } = useForm({
    defaultValues: {
      answers: quizData.questions.reduce((acc, question) => {
        acc[question._id] = question.type === "multiple" ? [] : "";
        return acc;
      }, {}),
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    const payload = {
      questionnaireId: quizData._id,
      answers: data.answers,
      timeSpent: Math.max(1, Math.floor((Date.now() - startTime) / 1000)),
    };
    await createAnswer(payload);
    setLoading(false);
    alert(
      `Quiz successfully completed!\nTime to complete:: ${payload.timeSpent} sec.`
    );
    navigate("/");
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={CSS.formWrapper}>
      {loading && <Loader />}
      <p className={CSS.title}>Time: {formatTime(seconds)}</p>
      <h1 className={CSS.title}>{quizData.quizName}</h1>
      <p className={CSS.text}>{quizData.quizDescription}</p>
      <div className={CSS.boxWrapper}>
        <div className={CSS.boxQuestions}>
          <p className={CSS.textTitle}>Questions:</p>
          {quizData.questions.map((question, qIndex) => (
            <div key={question._id} className={CSS.blocQuestions}>
              <div className={CSS.blocStatic}>
                <p className={CSS.textTitle}>{qIndex + 1}.</p>
                <p className={CSS.textTitle}>{question.text}</p>
              </div>
              <Controller
                control={control}
                name={`answers.${question._id}`}
                render={({ field }) => (
                  <>
                    {question.type === "text" ? (
                      <input
                        {...field}
                        placeholder="Your answer"
                        className={`${CSS.inputTextOption} ${CSS.input}`}
                      />
                    ) : (
                      question.options.map((option) => (
                        <label key={option.text}>
                          <input
                            type={
                              question.type === "multiple"
                                ? "checkbox"
                                : "radio"
                            }
                            value={option.text}
                            checked={
                              question.type === "multiple"
                                ? field.value.includes(option.text)
                                : field.value === option.text
                            }
                            onChange={(e) => {
                              if (question.type === "multiple") {
                                const newValue = e.target.checked
                                  ? [...field.value, option.text]
                                  : field.value.filter(
                                      (val) => val !== option.text
                                    );
                                setValue(`answers.${question._id}`, newValue);
                              } else {
                                setValue(
                                  `answers.${question._id}`,
                                  option.text
                                );
                              }
                            }}
                          />
                          {option.text}
                        </label>
                      ))
                    )}
                  </>
                )}
              />
            </div>
          ))}
        </div>
      </div>
      <button type="submit" className={`${CSS.textTitle} ${CSS.button}`}>
        Submit
      </button>
    </form>
  );
}
