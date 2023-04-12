import PrivateLayout from "../components/PrivateLayout/PrivateLayout";
import Dashboard from "../pages/Dashboard";
import DayOff from "../pages/DayOff";
import Forbidden from "../pages/Forbidden/Forbidden";
import Request from "../pages/Request";
import WorkSpace from "../pages/WorkSpace";

const privateRoutes = [
  {
    element: <PrivateLayout />,
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "request",
        element: <Request />,
      },
      {
        path: "dayoff",
        element: <DayOff />,
      },

      {
        path: "workspaces",
        element: <WorkSpace />,
      },
      {
        path: "403",
        element: <Forbidden />,
      },
    ],
  },
];

export default privateRoutes;
