import { useEffect, useState } from "react";
import { fetchAllQuestionnaires } from "../../api/QuestionnaireRequests";
import CatalogList from "../../components/CatalogList/CatalogList";

import CSS from "./CatalogPage.module.css";
import Loader from "../../components/Loader/Loader";
import Pagination from "../../components/Pagination/Pagination";
export default function CatalogPage() {
  const [quiz, setQuiz] = useState([]);
  const [paginatedQuiz, setPaginatedQuiz] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAllQuestionnaires()
      .then((data) => {
        if (data) {
          setQuiz(data);
          setPaginatedQuiz(data.slice(0, 6));
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
      {loading ? <Loader /> : <CatalogList quiz={paginatedQuiz} />}
      <Pagination quiz={quiz} onPageChange={setPaginatedQuiz} />
    </main>
  );
}
