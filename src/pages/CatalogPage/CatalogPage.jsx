import { useEffect, useState } from "react";
import { fetchAllQuestionnaires } from "../../api/QuestionnaireRequests";
import CatalogList from "../../components/CatalogList/CatalogList";
import CSS from "./CatalogPage.module.css";
export default function CatalogPage() {
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    fetchAllQuestionnaires().then((data) => {
      if (data) setQuiz(data);
    });
  }, []);

  return (
    <main className={CSS.wrapper}>
      <h1 className={CSS.title}>Questionnaire catalog</h1>
      <CatalogList quiz={quiz} />
    </main>
  );
}
