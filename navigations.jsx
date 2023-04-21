import {
  PieChartOutlined,
  ReconciliationOutlined,
  UserOutlined,
  UserAddOutlined,
  Loading3QuartersOutlined,
  UserSwitchOutlined,
  UnorderedListOutlined,
  UsergroupAddOutlined,
  TableOutlined,
  FileExcelOutlined,
  FormOutlined,
  AliwangwangOutlined,
  NotificationOutlined,
} from "@ant-design/icons";
import { ROLE } from "./src/constants/roles";

export const navigations = [
  {
    label: "ACCOUNT",
    key: "account",
    children: [
      {
        label: "DASHBOARD",
        key: "dashboard",
        icon: <PieChartOutlined />,
        authorize: [ROLE.ADMIN],
      },

      {
        label: "Request Account",
        key: "request-account",
        icon: <UserSwitchOutlined />,
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
            label: "Request Detail",
            key: "requests-detail",
            icon: <TableOutlined />,
          },

          {
            label: "InformationDayOff",
            key: "information-day-off",
            icon: <AliwangwangOutlined />,
          },

          {
            label: "CreateRequest",
            key: "dayoff",
          },
        ],
      },

      {
        label: "EXPORT",
        key: "export",
        icon: <FileExcelOutlined />,
        children: [
          {
            label: "Day Off",
            key: "export-dayoff",
          },
        ],
      },
    ],
  },

  {
    label: "MANAGER",
    key: "manager",
    authorize: [ROLE.ADMIN, ROLE.MANAGER],
    children: [
      {
        label: "Members",
        key: "members",
        icon: <UserOutlined />,
        authorize: [ROLE.MANAGER, ROLE.ADMIN],
      },

      {
        label: "Group",
        key: "group-detail",
        icon: <UsergroupAddOutlined />,
        authorize: [ROLE.MANAGER, ROLE.ADMIN],
      },
    ],
  },

  {
    label: "ADMIN",
    key: "admin",
    children: [
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
            authorize: [ROLE.ADMIN],
          },
        ],
      },
    ],
  },
];
