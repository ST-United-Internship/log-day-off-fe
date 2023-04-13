import {
  DatabaseOutlined,
  PieChartOutlined,
  ReconciliationOutlined,
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
    ],
  },
  {
    label: "Workspace",
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
];
