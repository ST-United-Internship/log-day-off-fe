import { PlusOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Space } from "antd";
import "../assets/styles/member.css";

const Member = () => {
  return (
    <>
      <div className="nav-container">
        <div className="wrapper">
          <a href="#">Branding</a>
          <Space wrap>
            <Button
              type="primary"
              icon={<PlusOutlined />}
              style={{ fontWeight: "600", marginRight: "0.5rem" }}
            >
              New Member
            </Button>
            <Button type="primary" style={{ fontWeight: "600" }}>
              Log off
            </Button>
            <UserOutlined className="user-icon" />
          </Space>
        </div>
      </div>
    </>
  );
};

export default Member;
