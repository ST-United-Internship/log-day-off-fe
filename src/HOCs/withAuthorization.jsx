import { Navigate } from "react-router-dom";
import { PROFILE } from "../constants/auth";
import { getStorageData } from "../helpers/storage";

const withAuthorization = (allowedRoles) => (Component) => {
  const WithAuthorization = (props) => {
    const profile = getStorageData(PROFILE);

    if (!allowedRoles.includes(profile?.role?.name)) {
      return <Navigate to="/403" />;
    }

    return <Component {...props} />;
  };

  return WithAuthorization;
};

export default withAuthorization;
