import { Outlet, createBrowserRouter } from "react-router-dom";
import privateRoutes from "./src/routes/privateRoutes";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Outlet />,
    children: [...privateRoutes],
  },
]);

export default router;
