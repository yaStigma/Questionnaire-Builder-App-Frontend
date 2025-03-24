import { useEffect, useState } from "react";
import { fetchAllQuestionnaires } from "../../api/QuestionnaireRequests";
import CatalogList from "../../components/CatalogList/CatalogList";

import CSS from "./CatalogPage.module.css";
import Loader from "../../components/Loader/Loader";
export default function CatalogPage() {
  const [quiz, setQuiz] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllQuestionnaires()
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
  }, []);

  return (
    <main className={CSS.wrapper}>
      <h1 className={CSS.title}>Questionnaire catalog</h1>
      {loading ? <Loader /> : <CatalogList quiz={quiz} setQuiz={setQuiz} />}
    </main>
  );
}
