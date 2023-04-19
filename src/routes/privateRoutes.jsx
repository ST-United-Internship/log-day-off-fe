import PrivateLayout from "../components/PrivateLayout/PrivateLayout";
import Dashboard from "../pages/Dashboard";
import DayOff from "../pages/DayOff";
import Request from "../pages/Request";
import RequestsDetail from "../pages/Requests-Detail";
import Members from "../pages/Members";
import Group from "../pages/Group";
import GroupDetail from "../pages/GroupDetail";
import Notification from "../pages/Notification";
import Forbidden from "../pages/Forbidden/Forbidden";
import FormUser from "../../src/pages/FormUser/index";
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

      {
        path: "groupdetail",
        element: <GroupDetail />,
      },
      {
        path: "notification",
        element: <Notification />,
      },
      {
        path: "workspaces",
        element: <WorkSpace />,
      },
    ],
  },
];

export default privateRoutes;
