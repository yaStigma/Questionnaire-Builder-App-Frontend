import CreateQuizForm from "../../components/CreateQuizForm/CreateQuizForm";
import CSS from "./BuilderPage.module.css";
export default function BuilderPage() {
  return (
    <main className={CSS.wrapper}>
      <h1 className={CSS.title}>Create new Quiz</h1>
      <CreateQuizForm />
    </main>
  );
}
