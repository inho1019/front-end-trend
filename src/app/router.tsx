import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import { useMemo } from "react";
import { Layout } from "@shared/ui/layout";
import { MagazinePage } from "@pages/magazine/ui";

const BrowserRouter = ({ children }: React.PropsWithChildren) => {
  const router = useMemo(() => createBrowserRouter(createRoutesFromElements(children), {
    basename: import.meta.env.PROD ? import.meta.env.PUBLIC_URL : undefined,
  }), [children]);

  return <RouterProvider router={router} />;
};

const Router = () => {
    
  return (
    <BrowserRouter>
      <Route element={<Layout />}>
          <Route path="/" element={<MagazinePage />} />
      </Route>
    </BrowserRouter>
  );
};
export default Router;
