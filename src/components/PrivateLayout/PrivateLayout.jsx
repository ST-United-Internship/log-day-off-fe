import { useState } from "react";
import { Layout } from "antd";
import { Outlet } from "react-router-dom";

import "./PrivateLayout.css";
import LayoutSider from "../LayoutSider";
import LayoutTopbar from "../LayoutTopbar";
import AppBreadcrumb from "../AppBreadcrumb";

const { Content } = Layout;

const PrivateLayout = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Layout hasSider>
      <LayoutSider collapsed={collapsed} />
      <Layout className="site-layout" style={{ width: "calc(100vw - 200px)" }}>
        <LayoutTopbar collapsed={collapsed} setCollapsed={setCollapsed} />
        <Layout className="site-layout-content">
          <AppBreadcrumb />
          <Content className="site-layout-background">
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </Layout>
  );
};

export default PrivateLayout;
