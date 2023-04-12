import {
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

export const navItems = [
  {
    key: "1",
    icon: <UserOutlined />,
    label: <Link to="/">DashBoard</Link>,
  },
  {
    key: "2",
    icon: <VideoCameraOutlined />,
    label: <Link to="/request">Request</Link>,
  },
  {
    key: "3",
    icon: <UploadOutlined />,
    label: "Days off",
  },
];
