import { Outlet, createBrowserRouter } from "react-router-dom";
import privateRoutes from "./src/routes/privateRoutes";
import publicRoutes from "./src/routes/publicRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [...privateRoutes, ...publicRoutes],
  },
]);

export default router;
