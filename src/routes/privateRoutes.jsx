import PrivateLayout from "../components/PrivateLayout/PrivateLayout";
import Dashboard from "../pages/Dashboard";
import DayOff from "../pages/DayOff";
import Request from "../pages/Request";
import RequestsDetail from "../pages/Requests-Detail";
import Members from "../pages/Members";

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

      {
        path: "members",
        element: <Members />,
      },

      {
        path: "group",
        element: <Group />,
      },
    ],
  },
];

export default privateRoutes;
