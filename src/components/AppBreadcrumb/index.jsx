import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import "./AppBreadcrumb.css";

const AppBreadcrumb = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter(Boolean);
  const restructurePathName =
    pathnames.length === 1
      ? [...pathnames, "list"]
      : pathnames.reduce((prePathArray, currentPath, index) => {
          if (!isNaN(Number(currentPath))) {
            const path =
              pathnames.at(index - 1) === "update"
                ? prePathArray
                : [...prePathArray, "detail"];
            return path;
          }
          return [...prePathArray, currentPath];
        }, []);

  return (
    <Breadcrumb>
      {restructurePathName.map((name, index) => {
        const routeTo = `/${restructurePathName.slice(0, index + 1).join("/")}`;
        const isLast = index === restructurePathName.length - 1;
        return isLast ? (
          <Breadcrumb.Item key={name}>{name}</Breadcrumb.Item>
        ) : (
          <Breadcrumb.Item key={name}>
            <Link to={routeTo}>{name}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
};

export default AppBreadcrumb;
