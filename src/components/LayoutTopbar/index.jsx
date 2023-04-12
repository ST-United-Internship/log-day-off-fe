import React from "react";
import { Layout } from "antd";

import "./LayoutTopbar.css";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";

const { Header } = Layout;

const LayoutTopbar = ({ collapsed, setCollapsed }) => {
  return (
    <Header style={{ padding: 0, background: "#fff" }}>
      {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
        className: "trigger",
        onClick: () => setCollapsed(!collapsed),
      })}
    </Header>
  );
};

export default LayoutTopbar;
