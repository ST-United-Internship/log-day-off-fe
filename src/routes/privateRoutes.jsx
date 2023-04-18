import PrivateLayout from "../components/PrivateLayout/PrivateLayout";
import Dashboard from "../pages/Dashboard";
import DayOff from "../pages/DayOff";
import Forbidden from "../pages/Forbidden/Forbidden";
import FormUser from "../pages/FormUser";
import Request from "../pages/Request";
import RequestsDetail from "../pages/Requests-Detail";
import Members from "../pages/Members";
import Group from "../pages/Group";

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
      {
        path: "403",
        element: <Forbidden />,
      },
      {
        path: "create-user",
        element: <FormUser />,
      },
    ],
  },
];

export default privateRoutes;
