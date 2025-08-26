import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import { useMemo } from "react";
import { Layout } from "@shared/ui/layout";
import { TrendPage } from "@pages/trend";
import { SitePage } from "@pages/site";
import { CodePanelProvider } from "@features/code";
import { ArchivePage } from "@pages/archive";

const BrowserRouter = ({ children }: React.PropsWithChildren) => {
  const router = useMemo(() => createBrowserRouter(createRoutesFromElements(children)), [children]);

  return <RouterProvider router={router} />;
};

const Router = () => {
  return (
    <BrowserRouter>
      <Route element={
        <CodePanelProvider>
          <Layout />
        </CodePanelProvider>
        }>
          <Route path="/" element={<TrendPage />} />
          <Route path="/site" element={<SitePage />} />
          <Route path="/archive" element={<ArchivePage />} />
      </Route>
    </BrowserRouter>
  );
};
export default Router;
