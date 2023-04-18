import PrivateLayout from "../components/PrivateLayout/PrivateLayout";
import Dashboard from "../pages/Dashboard";
import DayOff from "../pages/DayOff";
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
        path: "requestsDetail",
        element: <RequestsDetail />,
      },
      {
        path: "groupdetail",
        element: <GroupDetail />,
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
