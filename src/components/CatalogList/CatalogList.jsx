import CSS from "./CatalogList.module.css";
import { Link } from "react-router-dom";
import { deleteQuestionnaire } from "../../api/QuestionnaireRequests";
export default function CatalogList({ quiz, setQuiz }) {
  const handleDelete = async (id) => {
    try {
      const result = await deleteQuestionnaire(id);
      if (result) {
        setQuiz((prev) => prev.filter((q) => q._id !== id));
      }
    } catch (err) {
      console.error("Error:", err);
    }
  };

  return (
    <ul className={CSS.list}>
      {quiz.map((item, index) => (
        <li key={index} className={CSS.card}>
          <div className={CSS.titleWraper}>
            <h2 className={CSS.name}>{item.quizName}</h2>
            <p className={CSS.text}>
              <b>Description:</b> {item.quizDescription}
            </p>
          </div>
          <div className={CSS.infoWrapper}>
            <p className={CSS.text}>
              <b>Questions:</b> {item.questions.length}
            </p>
            <p className={CSS.text}>
              <b>Completions:</b> {item.completions}
            </p>
          </div>
          <div className={CSS.actionsWrapper}>
            <button
              type="button"
              title="Delete Quiz"
              className={CSS.actionsBtn}
              onClick={() => handleDelete(item._id)}
            >
              <img
                src="/delete.svg"
                alt="delete icon"
                className={CSS.actionsIcon}
              />
            </button>
            <button
              type="button"
              title="Correction Quiz"
              className={CSS.actionsBtn}
            >
              <img
                src="/correction.svg"
                alt="correction icon"
                className={CSS.actionsIcon}
              />
            </button>
            <button type="button" title="RUN Quiz" className={CSS.actionsBtn}>
              <img src="/run.svg" alt="run icon" className={CSS.actionsIcon} />
            </button>
          </div>
        </li>
      ))}
      <li key="00" className={CSS.card}>
        <div className={CSS.createBox}>
          <h2 className={CSS.name}>Create new Quiz</h2>
          <Link to="/quiz/create" className={CSS.createLink}>
            <img src="/plus.svg" alt="plus icon" className={CSS.plusIcon} />
          </Link>
        </div>
      </li>
    </ul>
  );
}
