import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { fetchQuestionnaireById } from "../../api/QuestionnaireRequests";
import Loader from "../../components/Loader/Loader";
import QuizForm from "../../components/QuizForm/QuizForm";
import CSS from "./InteractivePage.module.css";
export default function InteractivePage() {
  const { id } = useParams();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchQuestionnaireById(id)
      .then((data) => {
        if (data) {
          setQuiz(data);
        }
        setLoading(false);
      })
      .catch((error) => {
        console.error("Loading error:", error);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return <Loader />;
  }

  if (!quiz) {
    return <p className={CSS.title}>Quiz not found</p>;
  }

  return (
    <main className={CSS.wrapper}>
      <QuizForm quizData={quiz} />
    </main>
  );
}
