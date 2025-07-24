import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import { useMemo } from "react";
import { Layout } from "@shared/ui/layout";
import { TrendPage } from "@pages/trend/ui";
import ConsolePage from "@pages/console/ui/initial-page";

const BrowserRouter = ({ children }: React.PropsWithChildren) => {
  const router = useMemo(() => createBrowserRouter(createRoutesFromElements(children), {
    basename: import.meta.env.PROD ? "/front-end-trend" : undefined,
  }), [children]);

  return <RouterProvider router={router} />;
};

const Router = () => {
    
  return (
    <BrowserRouter>
      <Route element={<Layout />}>
          <Route path="/" element={<TrendPage />} />
          <Route path="/console" element={<ConsolePage />} />
      </Route>
    </BrowserRouter>
  );
};
export default Router;
