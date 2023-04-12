import { Layout } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";

const { Sider } = Layout;

const SiderMenu = ({ navigation }) => {
const items = [
  {
    label: "DASHBOARD",
    key: "dashboard",
    icon: <PieChartOutlined />,
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
    label: "DAYOFF",
    key: "dayoff",
    icon: <PieChartOutlined />,
  },
];

const SiderMenu = () => {
  const navigate = useNavigate();

  return (
    <Menu
      theme="dark"
      mode="inline"
      onClick={({ key }) => navigate(key)}
      items={navigation}
    />
  );
};

const LayoutSider = ({ collapsed, navigation }) => {
  return (
    <Sider
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ overflow: "auto", height: "100vh" }}
    >
      <div
        className="logo"
        style={{
          height: "32px",
          margin: "16px",
          background: "rgba(255, 255, 255, 0.3)",
        }}
      />
      <SiderMenu navigation={navigation} />
    </Sider>
  );
};

export default LayoutSider;
