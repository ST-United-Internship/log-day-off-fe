import {
  DatabaseOutlined,
  PieChartOutlined,
  ReconciliationOutlined,
  UserAddOutlined,
} from "@ant-design/icons";
import { ROLE } from "./src/constants/roles";

export const navigations = [
  {
    label: "DASHBOARD",
    key: "dashboard",
    icon: <PieChartOutlined />,
    authorize: [ROLE.ADMIN],
  },
  {
    label: "MASTERDATA",
    key: "master",
    icon: <DatabaseOutlined />,
    children: [
      {
        label: "USERS",
        key: "users",
      },
      {
        label: "Address",
        key: "address",
      },
      {
        label: "Group",
        key: "groupdetail",
      },
    ],
  },
  {
    label: "WORKSPACE",
    key: "workspace",
    icon: <ReconciliationOutlined />,
    authorize: [ROLE.ADMIN],
    children: [
      {
        label: "List",
        key: "workspaces",
      },
    ],
  },
  {
    label: "CREATE USER",
    key: "create-user",
    icon: <UserAddOutlined />,
    authorize: [ROLE.ADMIN, ROLE.MANAGER],
  },
];
