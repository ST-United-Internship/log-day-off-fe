import { Outlet, useNavigate } from "react-router-dom";

import "./PublicLayout.css";
import { useEffect } from "react";
import { getStorageData } from "../../helpers/storage";
import { ACCESS_TOKEN } from "../../constants/auth";

const PublicLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (getStorageData(ACCESS_TOKEN)) {
      navigate("/");
    }
  }, [getStorageData(ACCESS_TOKEN)]);

  return (
    <div className={"layout-container"}>
      <Outlet />
    </div>
  );
};

export default PublicLayout;
