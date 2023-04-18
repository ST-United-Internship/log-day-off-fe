import PrivateLayout from "../components/PrivateLayout/PrivateLayout";
import Dashboard from "../pages/Dashboard";
import DayOff from "../pages/DayOff";

import Request from "../pages/Request";
import RequestsDetail from "../pages/Requests-Detail";

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
        path: "requestsDetail",
        element: <RequestsDetail />,
      },
    ],
  },
];

export default privateRoutes;
