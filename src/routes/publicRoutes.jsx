import PublicLayout from "../components/PublicLayout/PublicLayout";
import Login from "../pages/Login/Login";

const routes = [
  {
    element: <PublicLayout />,
    children: [{ path: "signin", element: <Login /> }],
  },
];
export default routes;
