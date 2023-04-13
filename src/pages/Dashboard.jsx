import { ROLE } from "../constants/roles";
import withAuthorization from "../HOCs/withAuthorization";
const Dashboard = () => {
  return <div>Dashboard</div>;
};

export default withAuthorization([ROLE.ADMIN])(Dashboard);
