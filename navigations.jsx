import {
  DatabaseOutlined,
  PieChartOutlined,
  ReconciliationOutlined,
  UserOutlined,
  GroupOutlined,
  UserAddOutlined,
  Loading3QuartersOutlined,
  UserSwitchOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  NotificationOutlined,
  TableOutlined,
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
        label: "Group",
        key: "group-detail",
        icon: <UsergroupAddOutlined />,
      },
      {
        label: "Notification",
        key: "notification",
        icon: <NotificationOutlined />,
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
        icon: <UnorderedListOutlined />,
      },
    ],
  },

  {
    label: "MEMBERS",
    key: "members",
    icon: <UserOutlined />,
    authorize: [ROLE.MANAGER],
  },
  {
    label: "GROUP",
    key: "group",
    icon: <GroupOutlined />,
    authorize: [ROLE.MANAGER],
  },
  {
    label: "CREATE USER",
    key: "create-user",
    icon: <UserAddOutlined />,
    authorize: [ROLE.ADMIN, ROLE.MANAGER],
  },

  {
    label: "REQUEST",
    key: "request",
    icon: <Loading3QuartersOutlined />,
    authorize: [ROLE.ADMIN, ROLE.MANAGER, ROLE.MASTER],
    children: [
      {
        label: "Request Account",
        key: "request-account",
        icon: <UserSwitchOutlined />,
      },
      {
        label: "Request Detail",
        key: "requests-detail",
        icon: <TableOutlined />,
      },
      {
        label: "CreateRequest",
        key: "dayoff",
      },
    ],
  },
];
