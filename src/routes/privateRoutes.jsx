import PrivateLayout from "../components/PrivateLayout/PrivateLayout";
import Dashboard from "../pages/Dashboard";
import DayOff from "../pages/DayOff";
import InformationDayOff from "../pages/InformationDayOff";
import Request from "../pages/Request";
import RequestsDetail from "../pages/RequestDetail";
import Members from "../pages/Members";
import Group from "../pages/Group";
import GroupDetail from "../pages/GroupDetail";
import Notification from "../pages/Notification";
import Forbidden from "../pages/Forbidden/Forbidden";
import FormUser from "../../src/pages/FormUser/index";
import WorkSpace from "../pages/WorkSpace";
import RequestAccount from "../pages/RequestAccount";
import WorkSpaceDetail from "../pages/WorkSpaceDetail";
import ExportDayoff from "../pages/ExportGoogleSheet/ExportDayoff";
import Profile from "../pages/Profile/Profile";

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
        path: "profile",
        element: <Profile />,
        children: [
          {
            index: true,
            element: <Profile />,
          },
          {
            path: ":userId",
            element: <Profile />,
          },
        ],
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
        path: "request-detail/:id",
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
        path: "group/:id",
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

      {
        path: "request-account",
        element: <RequestAccount />,
      },

      {
        path: "workspace-detail/:id",
        element: <WorkSpaceDetail />,
      },
      {
        path: "export-dayoff",
        element: <ExportDayoff />,
      },
      {
        path: "information-day-off",
        element: <InformationDayOff />,
      },
    ],
  },
];

export default privateRoutes;
