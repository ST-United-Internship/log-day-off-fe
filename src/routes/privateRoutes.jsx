import PrivateLayout from "../components/PrivateLayout/PrivateLayout";
import Dashboard from "../pages/Dashboard";
import DayOff from "../pages/DayOff";
import Group from "../pages/Group";
import Member from "../pages/Member";
import Request from "../pages/Request";

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
        path: "member",
        element: <Member />,
      },
      {
        path: "group",
        element: <Group />,
      },
    ],
  },
];

export default privateRoutes;
