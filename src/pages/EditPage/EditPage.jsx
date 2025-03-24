import { useParams } from "react-router-dom";
import EditQuizForm from "../../components/EditQuizForm/EditQuizForm";
import CSS from "./EditPage.module.css";
import { useEffect, useState } from "react";
import { fetchQuestionnaireById } from "../../api/QuestionnaireRequests";
import Loader from "../../components/Loader/Loader";

export default function EditPage() {
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
      <h1 className={CSS.title}>Edit Quiz: {quiz.quizName}</h1>
      <EditQuizForm quizData={quiz} />
    </main>
  );
}
