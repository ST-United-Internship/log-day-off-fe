import PrivateLayout from "../components/PrivateLayout/PrivateLayout";
import Dashboard from "../pages/Dashboard";
import DayOff from "../pages/DayOff";
import Forbidden from "../pages/Forbidden/Forbidden";
import FormUser from "../pages/FormUser";
import Request from "../pages/Request";
<<<<<<< HEAD
=======
import ApproveModal from "../components/RequestForm/ApproveModal";
import RejectModal from "../components/RequestForm/RejectModal";
import RequestChange from "../components/RequestForm/RequestChange";
>>>>>>> 72e270f (feat: ldo-05 fix)

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
