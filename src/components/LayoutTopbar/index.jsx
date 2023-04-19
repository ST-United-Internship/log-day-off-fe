import React from "react";
import { Layout, Button, Dropdown, Space } from "antd";
import {
  UserOutlined,
  LogoutOutlined,
  DashboardOutlined,
  ReconciliationOutlined,
} from "@ant-design/icons";
import "./LayoutTopbar.css";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header } = Layout;

const LayoutTopbar = ({ collapsed, setCollapsed }) => {
  const items = [
    {
      key: "1",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          <DashboardOutlined />
          &nbsp; DashBoard
        </a>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer">
          <ReconciliationOutlined />
          &nbsp; WorkSpaces
        </a>
      ),
    },
    {
      key: "3",
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
            <Button style={{ marginRight: "50px" }}>
              <UserOutlined />
            </Button>
          </Dropdown>
        </Space>
      </Space>
    </Header>
  );
};

export default LayoutTopbar;
