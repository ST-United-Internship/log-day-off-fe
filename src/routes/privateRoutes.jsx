import PrivateLayout from "../components/PrivateLayout/PrivateLayout";
import Dashboard from "../pages/Dashboard";
import DayOff from "../pages/DayOff";
import Forbidden from "../pages/Forbidden/Forbidden";
import FormUser from "../pages/FormUser";
import Request from "../pages/Request";

import Notification from "../pages/Notification";
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
    ],
  },
];

export default privateRoutes;
