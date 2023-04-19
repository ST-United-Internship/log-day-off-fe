import { Layout } from "antd";
import { Menu } from "antd";
import { useNavigate } from "react-router-dom";
import "./LayoutSider.css";

const { Sider } = Layout;

const SiderMenu = ({ navigation }) => {
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

const LayoutSider = ({ collapsed, navigation, className }) => {
  return (
    <Sider
      className={className}
      trigger={null}
      collapsible
      collapsed={collapsed}
      style={{ overflow: "auto", height: "100vh" }}
    >
      <div className="logo-container">
        <h2>Log Day Off</h2>
        <img
          className="logo"
          style={{
            height: " 45px",
            borderRadius: "30px",
          }}
          src="https://res.cloudinary.com/da3bmd8ak/image/upload/v1681797035/logo..png"
        />
      </div>

      <SiderMenu navigation={navigation} />
    </Sider>
  );
};

export default LayoutSider;
