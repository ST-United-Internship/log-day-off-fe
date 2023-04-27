import React from "react";
import { Layout, Dropdown, Space } from "antd";
import { UserOutlined, LogoutOutlined } from "@ant-design/icons";
import "./LayoutTopbar.css";

import { MenuFoldOutlined, MenuUnfoldOutlined } from "@ant-design/icons";
import { Link, useNavigate } from "react-router-dom";
import { getStorageData } from "../../helpers/storage";
import { PROFILE } from "../../constants/auth";
import axios from "axios";

const { Header } = Layout;

const LayoutTopbar = ({ collapsed, setCollapsed }) => {
  const navigate = useNavigate();

  const profile = getStorageData(PROFILE);

  const handleLogout = (e) => {
    e.preventDefault();
    localStorage.clear();
    delete axios.defaults.headers.common["Authorization"];
    navigate("/signin");
  };
  const items = [
    {
      key: "1",
      label: (
        <Link rel="noopener noreferrer" to="/profile">
          <UserOutlined />
          &nbsp; Profile
        </Link>
      ),
    },
    {
      key: "2",
      label: (
        <a target="_blank" rel="noopener noreferrer" onClick={handleLogout}>
          <LogoutOutlined />
          &nbsp; Logout
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
      <Dropdown menu={{ items }}>
        <Space>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              cursor: "pointer",
              paddingRight: "20px",
            }}
          >
            <img
              className="img-drop"
              src="https://th.bing.com/th/id/OIP.nczpMSa69aDJWYGi0tKqggHaHa?w=205&h=205&c=7&r=0&o=5&dpr=1.3&pid=1.7"
            />
            {profile?.username}
          </div>
        </Space>
      </Dropdown>
    </Header>
  );
};

export default LayoutTopbar;
