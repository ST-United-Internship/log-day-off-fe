import React from "react";
import { Layout, Dropdown, Space } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import "./LayoutTopbar.css";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header } = Layout;

const LayoutTopbar = ({ collapsed, setCollapsed }) => {
  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          <UserOutlined />
          &nbsp; Profile
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          <LogoutOutlined />
          &nbsp; LogOut
        </a>
      ),
    },
  ];
  return (
    <Header style={{ padding: 0, background: "#fff" }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger-bar",
        onClick: () => setCollapsed(!collapsed),
      })}
      <Space direction="vertical">
        <Space wrap>
          <Dropdown menu={{ items }} placement="topRight">
            <img
              className="img-drop"
              src="https://th.bing.com/th/id/OIP.nczpMSa69aDJWYGi0tKqggHaHa?w=205&h=205&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            ></img>
          </Dropdown>
        </Space>
      </Space>
    </Header>
  );
};

export default LayoutTopbar;
