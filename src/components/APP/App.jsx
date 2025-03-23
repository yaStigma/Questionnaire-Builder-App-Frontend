import { lazy } from "react";
import { Suspense } from "react";
import Layout from "../layout/Layout";
import { Route, Routes } from "react-router";
const CatalogPage = lazy(() => import("../../pages/CatalogPage/CatalogPage"));
const BuilderPage = lazy(() => import("../../pages/BuilderPage/BuilderPage"));
const InteractivePage = lazy(() =>
  import("../../pages/InteractivePage/InteractivePage")
);
const NotFoundPage = lazy(() =>
  import("../../pages/NotFoundPage/NotFoundPage")
);
export default function App() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CatalogPage />} />
          <Route path="quiz/create" element={<BuilderPage />} />
          <Route path="/quiz/:id" element={<InteractivePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
