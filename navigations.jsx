import {
  DatabaseOutlined,
  PieChartOutlined,
  ReconciliationOutlined,
  UserOutlined,
  TableOutlined,
  GroupOutlined,
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
      {
        label: "Notifications",
        key: "notification",
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
    label: "Members",
    key: "members",
    icon: <UserOutlined />,
    authorize: [ROLE.MANAGER],
  },
  {
    label: "RequestsDetail",
    key: "requestsDetail",
    icon: <TableOutlined />,
    authorize: [ROLE.ADMIN, ROLE.MANAGER],
  },
  {
    label: "Group",
    key: "group",
    icon: <GroupOutlined />,
    authorize: [ROLE.MANAGER],
  },
    label: "CREATE USER",
    key: "create-user",
    icon: <UserAddOutlined />,
    authorize: [ROLE.ADMIN, ROLE.MANAGER],
  },
];
