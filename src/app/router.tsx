import { createBrowserRouter, createRoutesFromElements, Route, RouterProvider } from "react-router";
import { MainPage } from "../pages/main";
import { useMemo } from "react";
import { Layout } from "../shared/ui/layout";

const BrowserRouter = ({ children }: React.PropsWithChildren) => {
  const router = useMemo(() => createBrowserRouter(createRoutesFromElements(children)), [children]);

  return <RouterProvider router={router} />;
};

const Router = () => {
    
  return (
    <BrowserRouter>
      <Route element={<Layout />}>
          <Route path="/" element={<MainPage />} />
      </Route>
    </BrowserRouter>
  );
};
export default Router;
