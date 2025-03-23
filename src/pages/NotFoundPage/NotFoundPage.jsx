import CSS from "./NotFoundPage.module.css";
export default function NotFoundPage() {
  return (
    <main className={CSS.wrapper}>
      <h2 className={CSS.title}>Page not found</h2>
      <p className={CSS.text}>Please return to Quiz Catalog</p>
    </main>
  );
}
