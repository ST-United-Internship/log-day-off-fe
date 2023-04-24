import {
  PieChartOutlined,
  ReconciliationOutlined,
  UserOutlined,
  UserAddOutlined,
  Loading3QuartersOutlined,
  UserSwitchOutlined,
  UnorderedListOutlined,
  FileExcelOutlined,
  AliwangwangOutlined,
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
        label: "CREATE USER",
        key: "create-user",
        icon: <UserAddOutlined />,
        authorize: [ROLE.ADMIN, ROLE.MANAGER],
      },

      {
        label: "REQUEST",
        key: "request",
        icon: <Loading3QuartersOutlined />,
        authorize: [ROLE.ADMIN, ROLE.MANAGER, ROLE.MASTER, ROLE.STAFF],
        children: [
          {
            label: "InformationDayOff",
            key: "information-day-off",
            icon: <AliwangwangOutlined />,
          },

          {
            label: "Request Account",
            key: "request-account",
            icon: <UserSwitchOutlined />,
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
        label: "Groups",
        key: "group",
        icon: <UserOutlined />,
        authorize: [ROLE.MANAGER, ROLE.ADMIN],
      },
    ],
  },

  {
    label: "ADMIN",
    key: "admin",
    authorize: [ROLE.ADMIN],
    children: [
      {
        label: "WORKSPACE",
        key: "workspace",
        icon: <ReconciliationOutlined />,
        children: [
          {
            label: "List",
            key: "workspaces",
            icon: <UnorderedListOutlined />,
          },
        ],
      },
    ],
  },
];
