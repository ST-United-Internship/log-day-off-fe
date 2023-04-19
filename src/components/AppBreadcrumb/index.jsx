import { useLocation, Link } from "react-router-dom";
import { Breadcrumb } from "antd";
import "./AppBreadcrumb.css";

const AppBreadcrumb = () => {
  const { pathname } = useLocation();
  const pathnames = pathname.split("/").filter(Boolean);

  const restructurePathName = pathnames.reduce(
    (prePathArray, currentPath, index) => {
      const title = currentPath
        .split("-")
        .map((name) => name[0].toUpperCase() + name.substring(1))
        .join(" ");

      if (currentPath.includes("create")) {
        return [...prePathArray, { title, link: pathname }, { title: "Form" }];
      } else if (!isNaN(Number(currentPath))) {
        const previousPath = pathnames.at(index - 1);
        if (previousPath.includes("update"))
          return [
            ...prePathArray,
            { title, link: pathname },
            { title: "Form" },
          ];
        else
          return [
            ...prePathArray,
            { title, link: pathname },
            { title: "Detail" },
          ];
      } else if (pathnames.length === 1) {
        return [...prePathArray, { title, link: pathname }, { title: "List" }];
      } else return [...prePathArray, { title }];
    },
    []
  );

  function itemRender(item, _, items) {
    const last = items.indexOf(item) === items.length - 1;
    console.log(item.link);
    return last || !item.link ? (
      <span>{item.title}</span>
    ) : (
      <Link to={item.link}>{item.title}</Link>
    );
  }

  return <Breadcrumb itemRender={itemRender} items={restructurePathName} />;
};

export default AppBreadcrumb;
